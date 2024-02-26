"use client";

import Image from "next/image";
import { Tabs } from "@/components/tabs";

export default function TabsSection() {
  const tabs = [
    {
      title: "Home",
      value: "Home",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-purple-900">
          <p>Home</p>
          <DummyContent src="https://cdn.cosmicjs.com/91a83580-d4a0-11ee-a584-65599426e889-Screenshot-35.png" />
        </div>
      ),
    },
    {
      title: "Course Catalog",
      value: "Course Catalog",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-purple-900">
          <p>Course Catalog</p>
          <DummyContent src="https://cdn.cosmicjs.com/92150110-d4a0-11ee-a584-65599426e889-Screenshot-37.png" />
        </div>
      ),
    },
    {
      title: "Create Course",
      value: "Create Course",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-purple-900">
          <p>Create Course</p>
          <DummyContent src="https://cdn.cosmicjs.com/91f8c680-d4a0-11ee-a584-65599426e889-Screenshot-38.png" />
        </div>
      ),
    },
    {
      title: "User Dashboard",
      value: "User Dashboard",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-purple-900">
          <p>User Dashboard</p>
          <DummyContent src="https://cdn.cosmicjs.com/9128cc50-d4a0-11ee-a584-65599426e889-Screenshot-36.png" />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] p-12 md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start mb-40 mt-20">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent = ({ src }: { src: string }) => {
  return (
    <Image
      src={src}
      alt="image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
