import { FC } from "react";
import { Chapter, Course, Unit, User } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
interface GalleryCourseCardProps {
  course: Course & {
    author: User;
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
}
const GalleryCourseCard: FC<GalleryCourseCardProps> = async ({ course }) => {
  return (
    <>
      <div className="border rounded-lg bg-black border-secondary">
        <div className="relative">
          <Link href={`/course/${course.id}/0/0`} className="relative block w-fit">
            <Image
              src={course.image || ""}
              className="object-cover w-full max-h-[300px] rounded-t-lg"
              width={300}
              height={300}
              alt="picture of the course"
            />
            <span className="absolute px-2 py-1 text-white rounded-md bg-black/60 w-fit bottom-2 left-2 right-2">
              {course.name}
            </span>
          </Link>
        </div>

        <div className="p-4">
          <h4 className="text-sm text-secondary-foreground/60">Units</h4>
          <div className="space-y-1">
            {course.units.map((unit, unitIndex) => {
              return (
                <Link
                  href={`/course/${course.id}/${unitIndex}/0`}
                  key={unit.id}
                  className="block underline w-fit"
                >
                  {unit.name}
                </Link>
              );
            })}
          </div>
          <div>Author: {course.author.name}</div>
        </div>
      </div>
    </>
  );
};

export default GalleryCourseCard;
