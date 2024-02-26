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
              className="object-cover w-full h-[300px] rounded-t-lg"
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

{
  /* <a href="#" class="group relative block bg-black">
  <img
    alt=""
    src="https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
    class="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
  />

  <div class="relative p-4 sm:p-6 lg:p-8">
    <p class="text-sm font-medium uppercase tracking-widest text-pink-500">Developer</p>

    <p class="text-xl font-bold text-white sm:text-2xl">Tony Wayne</p>

    <div class="mt-32 sm:mt-48 lg:mt-64">
      <div
        class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
      >
        <p class="text-sm text-white">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores
          quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?
        </p>
      </div>
    </div>
  </div>
</a> */
}
