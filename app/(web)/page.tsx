import { Suspense } from "react";
import { Contact } from "@/features/home/contact";
import { HeroWithStats } from "@/features/home/hero-with-stats";
import { LatestPosts } from "@/features/home/latest-blog";
import { Projects } from "@/features/home/projects";
import { Skills } from "@/features/home/skills";
import { Stack } from "@/features/home/stack";

export default function Home() {
  return (
    <>
      <Suspense fallback={<div className="h-screen" />}>
        <HeroWithStats />
      </Suspense>

      <Projects />

      <Skills />

      <Stack />

      <Suspense fallback={<div className="py-16" />}>
        <LatestPosts />
      </Suspense>
      <Contact />
    </>
  );
}
