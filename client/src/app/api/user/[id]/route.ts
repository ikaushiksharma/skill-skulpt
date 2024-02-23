import { db } from "@/lib/db";
import { NextResponse } from "next/server";
interface IParams {
  id: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  try {
    const { id: userId } = params;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        courses: {
          select: {
            id: true,
            name: true,
            totalChapters: true,
          },
        },
      },
    });
    const userProgress = await db.courseProgress.findMany({
      where: {
        userId,
      },
      select: {
        courseId: true,
        chapters: true,
        course: {
          select: {
            id: true,
            name: true,
            totalChapters: true,
          },
        },
      },
    });

    return NextResponse.json({ userProgress, user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
