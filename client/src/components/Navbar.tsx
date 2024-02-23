import React from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/navbar-menu";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { getAuthSession } from "@/lib/auth";
import SignInButton from "./SignInButton";
import UserAccountNav from "./UserAccountNav";
import Image from "next/image";
export default async function Navbar({ className }: { className?: string }) {
  const session = await getAuthSession();

  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-md:hidden max-w-screen-md lg:max-w-screen-lg mx-auto z-50",
        className,
      )}
    >
      <Menu>
        <HoveredLink href="/">
          <img className="h-12 w-48 relative" alt="logo" src="/logo-black.png" />
        </HoveredLink>
        <div className="flex items-center space-x-12 justify-center">
          <MenuItem item={<HoveredLink href="/create">Create Course</HoveredLink>}></MenuItem>
          <MenuItem item={<HoveredLink href="/gallery">Explore Courses</HoveredLink>}></MenuItem>
          <MenuItem
            item={session?.user ? <UserAccountNav user={session.user} /> : <SignInButton />}
          ></MenuItem>
          <MenuItem item={<ThemeToggle />}></MenuItem>
        </div>
      </Menu>
    </div>
  );
}
