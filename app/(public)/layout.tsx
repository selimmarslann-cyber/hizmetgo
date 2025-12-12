import type { ReactNode } from "react";
import PublicLayoutClient from "@/components/client/PublicLayoutClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <PublicLayoutClient>{children}</PublicLayoutClient>;
}
