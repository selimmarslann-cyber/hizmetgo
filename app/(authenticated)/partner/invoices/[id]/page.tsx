import PartnerInvoiceDetailPageClient from "./PartnerInvoiceDetailPageClient";

export default function PartnerInvoiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <PartnerInvoiceDetailPageClient invoiceId={params.id} />;
}

