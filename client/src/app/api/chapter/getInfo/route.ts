import { db } from "@/lib/db";
import { strict_output } from "@/lib/gpt";
import { getQuestionsFromTranscript, getTranscript, searchYoutube } from "@/lib/youtube";
import { strict } from "assert";
import { NextResponse } from "next/server";
import { resolve } from "path";
import { z } from "zod";
const { getChapterInfo } = require("@/lib/gpt");
// api/chapter/getInfo

// sleep for 0-4 seconds to simulate async behavior of real world api calls to database etc.

const bodyParser = z.object({
  // converting the body to a zod schema to validate it and get the types
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

    const videoId = await searchYoutube(chapter.youtubeSearchQuery)
      .then((videoId) => {
        return videoId;
      })
      .catch((error) => {
        return "";
      });
    console.log("CHAPTER NAME😶‍🌫️😶‍🌫️", chapter.youtubeSearchQuery);
    // const { result }: { result: string } = await strict_output(
    //   "You are an AI capable of generating a article about a topic",
    //   "Write an article in 300 words or less on the topic of " + chapter.youtubeSearchQuery,
    //   { result: "article on given topic" },
    // );
    // const result = await getChapterInfo(chapter.name);
    const result = await getTranscript(videoId);

    const questions = await getQuestionsFromTranscript(result, chapter.youtubeSearchQuery)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return [];
      });


    // create questions in database
    await db.question.createMany({
      data: questions.map((question) => {
        let options = [question.answer, question.option1, question.option2, question.option3];
        options = options.sort(() => Math.random() - 0.5); // shuffle the options array randomly (see https://stackoverflow.com/a/2450976/13697995)
        return {
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          chapterId: chapterId,
        };
      }),
    });


    // Update Chapter in Database with videoId and summary

    await db.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        videoId,
        summary: result,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
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
