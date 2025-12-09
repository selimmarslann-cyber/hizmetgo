export const dynamic = "force-dynamic";

import AdminTicketDetailPageClient from "./AdminTicketDetailPageClient";

export default function AdminTicketDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <AdminTicketDetailPageClient ticketId={params.id} />;
}


