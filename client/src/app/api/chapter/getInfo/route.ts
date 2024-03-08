import { db } from "@/lib/db";
import { strict_output } from "@/lib/gpt";
import { getQuestionsFromTranscript, searchYoutube } from "@/lib/youtube";
import { NextResponse } from "next/server";
import { z } from "zod";
// api/chapter/getInfo

const bodyParser = z.object({
  chapterId: z.string(),
});
// const sleep = async () =>
//   new Promise((resolve) => {
//     setTimeout(resolve, Math.random() * 4000);
//   });

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { chapterId } = bodyParser.parse(body);

    // Get Chapter Info from Database using chapterId

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
      },
    });

    if (!chapter) {
      return NextResponse.json(
        {
          success: false,
          error: "Chapter not found",
        },
        {
          status: 404,
        },
      );
    }

    // Get Youtube Video Id from Youtube Search Query

    const videoId = await searchYoutube(chapter.youtubeSearchQuery);

    console.log("VIDEO FOUND😍😍", videoId);
    const { result }: { result: string[] } = await strict_output(
      "You are an AI capable of generating a article about a topic",
      "Write a three paragraphs on the topic of " + chapter.name,
      { result: "array of three paragraphs in json" },
    );
    console.log("Summary Found🦄🦄", result);

    // const questions = await getQuestionsFromTranscript(result, chapter.youtubeSearchQuery)
    //   .then((data) => {
    //     return data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     return [];
    //   });

    // console.log("QUESTIONS", questions);
    // create questions in database
    // if (questions.length > 0) {
    //   await db.question.createMany({
    //     data: questions.map((question) => {
    //       let options = [question.answer, question.option1, question.option2, question.option3];
    //       options = options.sort(() => Math.random() - 0.5);
    //       return {
    //         question: question.question,
    //         answer: question.answer,
    //         options: JSON.stringify(options),
    //         chapterId: chapterId,
    //       };
    //     }),
    //   });
    // }

    // Update Chapter in Database with videoId and summary

    await db.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        videoId,
        summary: result.join(" "),
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error); 
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: error.issues,
        },
        {
          status: 400,
        },
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Something went wrong",
        },
        {
          status: 500,
        },
      );
    }
  }
}
