import PublicHomepageClient from "./PublicHomepageClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function PublicHomepagePage() {
  return <PublicHomepageClient />;
}

