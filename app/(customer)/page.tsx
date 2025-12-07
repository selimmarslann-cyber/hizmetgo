"use client";
import nextDynamic from "next/dynamic";

const ClientHero = nextDynamic(() => import("./ClientHero"), {
  ssr: false,
  loading: () => null,
});

export default function HomePage() {
  return (
    <main>
      <ClientHero />
    </main>
  );
}

