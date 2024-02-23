export type UserProgressProps = {
  courseId: string;
  chapters: string[];
  course: {
    id: string;
    name: string;
    totalChapters: number;
  };
};