"use client";
import React from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";

type MarkAsCompleteProps = {
  chapterId: string;
  userId?: string;
  courseId: string;
};
const MarkAsComplete = ({ chapterId, userId, courseId }: MarkAsCompleteProps) => {
  const { toast } = useToast();

  const [loading, setLoading] = React.useState(false);
  const handleComplete = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/course/progress", {
        chapterId,
        userId,
        courseId,
      });
      const status = res.status;
      const data = await res.data;
      toast({
        title: "Success",
        description: "Chapter Marked as Completed",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as any)?.response?.data?.error || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button disabled={loading} variant={"secondary"} onClick={handleComplete}>
      {loading ? (
        <>
          <span>
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          </span>
          Please Wait
        </>
      ) : (
        "Mark as Completed!"
      )}
    </Button>
  );
};

export default MarkAsComplete;
