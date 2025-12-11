import { Metadata } from "next";
import AccountDeletePageClient from "./AccountDeletePageClient";

export const metadata: Metadata = {
  title: "Hesap Silme | Hizmetgo",
  description:
    "Hizmetgo hesabınızı ve tüm verilerinizi kalıcı olarak silmek için bu sayfayı kullanın.",
  robots: "noindex, nofollow",
};

export const dynamic = "force-dynamic";

export default function AccountDeletePage() {
  return <AccountDeletePageClient />;
}

