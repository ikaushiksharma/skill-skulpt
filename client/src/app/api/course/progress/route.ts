import { db } from "@/lib/db";
import { sendMail } from "@/lib/mail-sender";
import { progress } from "framer-motion";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const { courseId, chapterId, userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const prog = await db.courseProgress.findFirst({
      where: {
        userId,
        courseId,
      },
    });
    if (prog && prog.chapters.includes(chapterId)) {
      return NextResponse.json({ error: "Already Completed" }, { status: 401 });
    }
    const course = await db.course.findFirst({ where: { id: courseId } });
    let progress;
    if (prog) {
      progress = await db.courseProgress.update({
        where: {
          id: prog.id,
        },
        data: {
          chapters: {
            push: chapterId,
          },
        },
      });
    } else {
      progress = await db.courseProgress.create({
        data: {
          userId,
          courseId,
          chapters: [chapterId],
        },
      });
    }

    if (course?.totalChapters === progress.chapters.length) {
      const user = await db.user.findUnique({
        where: {
          id: userId,
        },
      });
      console.log("SENDING MAIL");
      await sendMail(user?.email + "", userId, courseId);
      console.log("SENT MAIL");
    }

    return NextResponse.json({ data: progress }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
