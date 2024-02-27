import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript";
import { strict_output } from "./gpt";

export async function searchYoutube(searchQuery: string) {
  // hello world --> hello+world
  searchQuery = encodeURIComponent(searchQuery);
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=${searchQuery}&videoEmbeddable=true&type=video&maxResults=1`,
    );
    return data.items[0].id.videoId;
  } catch (error) {
    return null;
  }
}

// get transcript from youtube video Id
export async function getTranscript(videoId: string) {
  try {
    let transcript_arr = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: "en",
      country: "EN",
    });
    let transcript = "";
    for (let t of transcript_arr) {
      transcript += t.text + " ";
    }
    return transcript.replaceAll("\n", " ");
  } catch (error) {
    return "";
  }
}

// GetQuestion from Transcript

export async function getQuestionsFromTranscript(transcript: string[], course_title: string) {
  type Question = {
    question: string;
    answer: string;
    option1: string;
    option2: string;
    option3: string;
  };
  try {
    const questions: Question[] = await strict_output(
      "You are a helpful AI that is able to generate three best multiple choice questions and answers in json format, the length of each answer should not be more than 10 words",
      new Array(3).map(
        (i) =>
          "You are to generate a random hard multiple choice questions about " +
          course_title +
          " with context of the following paragraph: " +
          transcript[i],
        +" for concept check",
      ),
      {
        question: "question",
        answer: "answer with max length of 10 words",
        option1: "option1 with max length of 10 words",
        option2: "option2 with max length of 10 words",
        option3: "option3 with max length of 10 words",
      },
    );
    return questions;
  } catch {
    return [];
  }
}
