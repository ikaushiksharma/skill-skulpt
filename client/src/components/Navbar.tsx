"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/navbar-menu";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-md:hidden max-w-screen-md lg:max-w-screen-lg mx-auto z-50",
        className,
      )}
    >
      <Menu setActive={setActive}>
        <div>Logo here</div>

        <div className="flex items-center space-x-12 justify-center">
          <MenuItem item={<HoveredLink href="/create">Create Course</HoveredLink>}></MenuItem>
          <MenuItem item={<HoveredLink href="/gallery">Explore Courses</HoveredLink>}></MenuItem>
          <MenuItem item={<HoveredLink href="/profile">User Profile</HoveredLink>}></MenuItem>
          <MenuItem item={<ThemeToggle />}></MenuItem>
        </div>
      </Menu>
    </div>
  );
}
