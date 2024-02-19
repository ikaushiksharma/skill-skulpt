"use client";
import React from "react";
import { HeroParallax } from "@/components/home/hero-parallax";
import { products } from "@/data";

export default function Page() {
  return <HeroParallax products={products} />;
}
