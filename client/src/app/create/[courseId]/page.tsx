import ConfirmChapters from "@/components/ConfirmChapters";
import { toast } from "@/components/ui/use-toast";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Info } from "lucide-react";
import { redirect } from "next/navigation";
import { FC } from "react";

interface CreateChaptersProps {
  params: { courseId: string };
}

const CreateChapters: FC<CreateChaptersProps> = async ({ params: { courseId } }) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }


  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col items-start max-w-xl mx-auto">
      <h5 className="text-sm uppercase text-secondary-foreground/60">
        Course / {course.name} / Create Chapters
      </h5>
      <h1 className="text-5xl font-bold">{course.name}</h1>
      <div className="flex p-4 mt-5 border-none bg-secondary">
        <Info className="w-12 h-12 mr-3 text-purple-500" />
        <p className="text-xl text-secondary-foreground/60">
          We generated chapters for each of your units. Look over them and then click the Button to
          confirm and continue.
        </p>
      </div>
      <ConfirmChapters course={course} />
    </div>
  );
};

export default CreateChapters;
