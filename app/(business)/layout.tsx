import type { ReactNode } from "react";
import BusinessLayoutClient from "@/components/client/BusinessLayoutClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function BusinessLayout({ children }: { children: ReactNode }) {
  return <BusinessLayoutClient>{children}</BusinessLayoutClient>;
}
