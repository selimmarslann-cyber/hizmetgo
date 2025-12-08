import type { ReactNode } from "react";
import CustomerLayoutClient from "@/components/client/CustomerLayoutClient";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return <CustomerLayoutClient>{children}</CustomerLayoutClient>;
}
