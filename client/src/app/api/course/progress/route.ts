import { db } from "@/lib/db";
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
    if (prog) {
      const updatedProgress = await db.courseProgress.update({
        where: {
          id: prog.id,
        },
        data: {
          chapters: {
            push: chapterId,
          },
        },
      });
      return NextResponse.json({ data: updatedProgress }, { status: 200 });
    }
    const courseProgress = await db.courseProgress.create({
      data: {
        userId,
        courseId,
        chapters: [chapterId],
      },
    });

    return NextResponse.json({ data: courseProgress }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}