import GalleryCourseCard from "@/components/GalleryCourseCard";
import { db } from "@/lib/db";
import Link from "next/link";
import React from "react";

interface GalleryPageProps {}
const GalleryPage = async ({}: GalleryPageProps) => {
  // Get all courses details from the database
  const courses = await db.course.findMany({
    include: {
      author: true,
      units: {
        include: {
          chapters: {
            include: { questions: true },
          },
        },
      },
    },
  });
  return (
    <div className="mx-auto h-[100dvh] overflow-hidden py-24 max-w-screen-xl">
      <div className="sticky z-20 w-full">
        <h1 className="w-full py-12 text-3xl text-center font-bold sm:text-6xl">
          Our Curated Courses
        </h1>
      </div>
      <div className="grid overflow-scroll h-full grid-cols-1 md:gap-12 sm:grid-cols-2 md:grid-cols-3">
        {courses.map((course) => {
          return <GalleryCourseCard course={course} key={course.id} />;
        })}
      </div>
    </div>
  );
};

export default GalleryPage;
