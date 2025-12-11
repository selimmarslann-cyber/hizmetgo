import { Metadata } from "next";
import RegisterSkillsPageClient from "./RegisterSkillsPageClient";

export const metadata: Metadata = {
  title: "Yeteneklerinizi Seçin | Hizmetgo",
  description: "Hizmetgo kayıt - Yeteneklerinizi seçin",
};

export const dynamic = "force-dynamic";

export default function RegisterSkillsPage() {
  return <RegisterSkillsPageClient />;
}

