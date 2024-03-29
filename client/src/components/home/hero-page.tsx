"use client";
import { BackgroundBeams } from "../beams";
import { MacbookScroll } from "../macbook-scroll";
import TabsSection from "./sections";
import Testimonials from "./testimonials";
import TypewriterSection from "./typewriter-section";

export default function Page() {
  return (
    <div className=" min-h-screen bg-purple-500/10 dark:bg-black w-full">
      <BackgroundBeams />

      <MacbookScroll
        src="https://cdn.cosmicjs.com/11965f20-d18f-11ee-9ce5-59949019255e-cover.png"
        showGradient={true}
      />
      <TypewriterSection />
      <TabsSection />
      <Testimonials />
    </div>
  );
}
