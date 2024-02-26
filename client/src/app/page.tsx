"use client";
import React, { useEffect } from "react";
import Hero from "@/components/home/hero-page";

export default function Page() {
  useEffect(() => {
    (async () => {
      // @ts-ignore
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);
  return <Hero />;
}
