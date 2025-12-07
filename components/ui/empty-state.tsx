import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Inbox } from "lucide-react";

import Link from "next/link";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  ctaText?: string;
  ctaLink?: string;
  ctaAction?: () => void;
  action?: ReactNode; // ★ Yeni eklenen prop
}

export default function EmptyState({
  title = "Henüz burada bir kayıt yok",
  description = "Yakında burada içerik görünecek.",
  icon,
  ctaText,
  ctaLink,
  ctaAction,
  action,
}: EmptyStateProps) {
  return (
    <Card className="border-2 border-dashed border-slate-200 bg-slate-50/50">
      <CardContent className="flex flex-col items-center justify-center py-16 px-4">
        <div className="mb-6 text-slate-400">
          {icon || <Inbox className="w-16 h-16" />}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">
          {title}
        </h3>
        <p className="text-sm text-slate-600 text-center max-w-sm mb-6 leading-relaxed">
          {description}
        </p>

        {action ? (
          <div className="mt-2">{action}</div>
        ) : (
          <>
            {ctaText && ctaLink && (
              <Link href={ctaLink}>
                <Button className="bg-[#FF6000] hover:bg-[#FF5500] text-white">
                  {ctaText}
                </Button>
              </Link>
            )}
            {ctaText && ctaAction && (
              <Button
                onClick={ctaAction}
                className="bg-[#FF6000] hover:bg-[#FF5500] text-white mt-2"
              >
                {ctaText}
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
