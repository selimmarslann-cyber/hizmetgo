import type { ReactNode } from "react";
import BusinessLayoutClient from "@/components/client/BusinessLayoutClient";

export default function BusinessLayout({ children }: { children: ReactNode }) {
  return <BusinessLayoutClient>{children}</BusinessLayoutClient>;
}
