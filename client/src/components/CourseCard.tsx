import Image from "next/image";
import { FollowerPointerCard } from "./following-pointer";
import Link from "next/link";

export default function CourseCard({
  id,
  title,
  avatar,
  image,
  author,
  description,
  date,
}: {
  id: string;
  title: string;
  avatar: string;
  image: string;
  author: string;
  description: string[];
  date: string;
}) {
  return (
    <div className="w-96 mx-auto">
      <FollowerPointerCard title={<TitleComponent title={author} avatar={avatar} />}>
        <div className="relative w-full overflow-hidden h-full rounded-2xl transition duration-200 group dark:bg-zinc-200 bg-zinc-900 hover:shadow-xl border border-zinc-100">
          <div className="w-full aspect-w-16 aspect-h-10 bg-zinc-200 rounded-tr-lg rounded-tl-lg overflow-hidden xl:aspect-w-16 xl:aspect-h-10 relative">
            <img
              src={image}
              alt="thumbnail"
              className={`group-hover:scale-95 group-hover:rounded-2xl transform object-cover transition duration-200 `}
            />
          </div>
          <div className=" p-4">
            <h2 className="font-bold my-4 text-lg text-zinc-100 dark:text-zinc-700">{title}</h2>
            {description.map((desc, index) => (
              <p className="font-normal my-1 text-sm text-zinc-300 dark:text-zinc-500">{desc}</p>
            ))}
            <div className="flex flex-row justify-between items-center mt-10">
              <span className="text-sm text-gray-500">{date}</span>
              <Link
                href={`/course/${id}/0/0`}
                className="relative z-10 px-6 py-2 bg-white dark:bg-black text-zinc-800 dark:text-white font-bold rounded-xl block text-sm"
              >
                Enroll
              </Link>
            </div>
          </div>
        </div>
      </FollowerPointerCard>
    </div>
  );
}

const TitleComponent = ({ title, avatar }: { title: string; avatar: string }) => (
  <div className="flex space-x-2 items-center">
    <Image
      src={avatar}
      height="20"
      width="20"
      alt="thumbnail"
      className="rounded-full border-2 border-white"
    />
    <p>{title}</p>
  </div>
);
