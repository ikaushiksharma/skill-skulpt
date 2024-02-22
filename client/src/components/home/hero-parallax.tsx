"use client";
import { BackgroundBeams } from "../beams";
import { MacbookScroll } from "../macbook-scroll";

export default function Page() {
  return (
    <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
      <BackgroundBeams />

      <MacbookScroll
        src="https://cdn.cosmicjs.com/11965f20-d18f-11ee-9ce5-59949019255e-cover.png"
        showGradient={true}
      />
    </div>
  );
}
