import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const { chapterId, userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const findProgress = await db.userProgress.findFirst({
      where: {
        userId,
        chapterId,
      },
    });
    if (findProgress) {
      return NextResponse.json({ error: "Chapter already marked as completed" }, { status: 409 });
    }
    const userProgress = await db.userProgress.create({
      data: {
        userId,
        chapterId,
        isCompleted: true,
      },
    });

    await db.chapter.update({
      where: { id: chapterId },
      data: {
        userProgress: {
          connect: {
            id: userProgress.id,
          },
        },
      },
    });

    return NextResponse.json({ data: userProgress }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
