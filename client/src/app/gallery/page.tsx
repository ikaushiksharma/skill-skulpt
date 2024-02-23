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
    <div className="mx-auto max-w-7xl">
      <h1 className="self-center mb-16 text-3xl font-bold text-center sm:text-6xl">
        Our Curated Courses
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
        {courses.map((course) => {
          return <GalleryCourseCard course={course} key={course.id} />;
        })}
      </div>
    </div>
  );
};

export default GalleryPage;
