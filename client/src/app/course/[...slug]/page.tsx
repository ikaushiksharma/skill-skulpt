import CourseSideBar from "@/components/CourseSideBar";
import MainVideoSummary from "@/components/MainVideoSummary";
import MarkAsComplete from "@/components/MarkAsComplete";
import QuizCards from "@/components/QuizCards";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface CoursePageProps {
  params: {
    slug: string;
  };
}

const CoursePage = async ({ params: { slug } }: CoursePageProps) => {
  const session = await getAuthSession();
  const [courseId, unitIndexParam, chapterIndexParam] = slug;
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

  if (!course) {
    return redirect("/gallery");
  }

  let unitIndex = parseInt(unitIndexParam);
  let chapterIndex = parseInt(chapterIndexParam);

  const unit = course.units[unitIndex];
  if (!unit) {
    return redirect("/gallery");
  }
  const chapter = unit.chapters[chapterIndex];
  if (!chapter) {
    return redirect("/gallery");
  }

  const nextChapter = unit.chapters[chapterIndex + 1];
  const prevChapter = unit.chapters[chapterIndex - 1];

  return (
    <div className="flex max-w-screen-2xl mx-auto">
      <CourseSideBar course={course} currentChapterId={chapter.id} />
      <div className="ml-[400px] px-8">
        <div className="flex">
          <MainVideoSummary
            chapter={chapter}
            chapterIndex={chapterIndex}
            unit={unit}
            unitIndex={unitIndex}
          />
          <QuizCards chapter={chapter} />
        </div>
        <div className="flex-[1] flex flex-col h-[1px] mt-4 text-gray-500 bg-gray-500" />
        <div className="flex pb-8">
          {prevChapter && (
            <Link
              href={`/course/${course.id}/${unitIndex}/${chapterIndex - 1}`}
              className="flex mt-4 mr-auto w-fit"
            >
              <div className="flex items-center">
                <ChevronLeft className="w-6 h-6 mr-1" />
                <div className="flex flex-col items-start">
                  <span className="text-sm text-secondary-foreground/60">Previous</span>
                  <span className="text-xl font-bold">{prevChapter.name}</span>
                </div>
              </div>
            </Link>
          )}

          {nextChapter && (
            <Link
              href={`/course/${course.id}/${unitIndex}/${chapterIndex + 1}`}
              className="flex mt-4 ml-auto w-fit"
            >
              <div className="flex items-center">
                <div className="flex flex-col items-start">
                  <span className="text-sm text-secondary-foreground/60">Next</span>
                  <span className="text-xl font-bold">{nextChapter.name}</span>
                </div>
                <ChevronRight className="w-6 h-6 ml-1" />
              </div>
            </Link>
          )}
        </div>
        <MarkAsComplete courseId={course.id} chapterId={chapter.id} userId={session?.user.id} />
      </div>
    </div>
  );
};

export default CoursePage;
