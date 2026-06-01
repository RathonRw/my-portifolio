import { Suspense } from "react";
import { Contact } from "@/features/home/contact";
import { HeroWithStats } from "@/features/home/hero-with-stats";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* <Navigation /> */}
      <main>
        <Suspense fallback={<div className="h-screen" />}>
          <HeroWithStats />
        </Suspense>
        {/*
        <Projects />
        <Skills />
        <Stack />
        <Suspense fallback={<div className="py-16" />}>
          <LatestPosts />
        </Suspense> */}
        <Contact />
      </main>
    </div>
  );
}
