import { Chapter, Course, Unit } from "@prisma/client";
import { create } from "zustand";

type CourseType = Course & {
  units: (Unit & {
    chapters: Chapter[];
  })[];
};

type CourseStore = {
  course: CourseType | null;
  currentChapterId: string | null;
  setCourse: (course: CourseType) => void;
  setChapterId: (chapterId: string) => void;
};

export const useCourseInfo = create<CourseStore>((set) => ({
  course: null,
  currentChapterId: null,
  setCourse: (course: CourseType) => set({ course: course }),
  setChapterId: (chapterId: string) => set({ currentChapterId: chapterId }),
}));
