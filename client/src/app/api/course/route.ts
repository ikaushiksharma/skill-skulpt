import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const { courseId } = await req.json();
    const course = await db.course.findUnique({
      where: { id: courseId },
      include: {
        units: {
          include: {
            chapters: {
              include: { questions: true },
            },
          },
        },
      },
    });
    return NextResponse.json(course);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
