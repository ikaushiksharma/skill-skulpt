import { Chapter, Unit } from "@prisma/client";
import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion";

type Props = {
  chapter: Chapter;
  unit: Unit;
  unitIndex: number;
  chapterIndex: number;
};

const MainVideoSummary = ({ unit, unitIndex, chapter, chapterIndex }: Props) => {
  return (
    <div className="flex-[2] mt-16">
      <h4 className="text-sm uppercase text-secondary-foreground/60">
        Unit {unitIndex + 1} &bull; Chapter {chapterIndex + 1}
      </h4>
      <h1 className="text-4xl font-bold">{chapter.name}</h1>
      <iframe
        title="chapter video"
        className="w-full mt-4 aspect-video max-h-[24rem] border-2 border-purple-500 rounded-lg"
        src={`https://www.youtube.com/embed/${chapter.videoId}`}
        allowFullScreen
      />
      <div className="mt-4">
        <p className="mt-2 text-secondary-foreground/80">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-2xl font-semibold">Summary</AccordionTrigger>
              <AccordionContent>{chapter.summary}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </p>
      </div>
    </div>
  );
};

export default MainVideoSummary;
