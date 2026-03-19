"use client";

import dynamic from "next/dynamic";

const ThreeHero = dynamic(
  () => import("@/components/three-hero").then((m) => ({ default: m.ThreeHero })),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 -z-10 h-full w-full" />,
  }
);

export function ThreeHeroLazy() {
  return <ThreeHero />;
}
