"use client";
import { TypewriterEffectSmooth } from "@/components/typewriter-effect";
export default function TypewriterSection() {
  const words = [
    {
      text: "Build",
    },
    {
      text: "awesome",
    },
    {
      text: "courses",
    },
    {
      text: "with",
    },
    {
      text: "Skill Skulpt.",
      className: "text-purple-500 dark:text-purple-500",
    },
  ];
  return (
    <div className="flex flex-col isolate items-center justify-center h-[40rem] w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative ">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        The road to knowledge starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Explore Courses
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Create Course
        </button>
      </div>
    </div>
  );
}
