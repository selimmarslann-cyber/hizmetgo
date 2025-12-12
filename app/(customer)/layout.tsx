import type { ReactNode } from "react";
import CustomerLayoutClient from "@/components/client/CustomerLayoutClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return <CustomerLayoutClient>{children}</CustomerLayoutClient>;
}
