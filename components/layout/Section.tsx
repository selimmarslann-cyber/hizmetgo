import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

interface SectionProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

/**
 * Global section wrapper component.
 * Sadece UI/layout sağlar, business logic içermez.
 */
export default function Section({
  title,
  subtitle,
  actions,
  children,
  className,
  contentClassName,
}: SectionProps) {
  return (
    <section
      className={cn(
        "rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-5 md:p-6",
        className,
      )}
    >
      {(title || subtitle || actions) && (
        <header className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            {title && (
              <h2 className="text-lg md:text-xl font-semibold text-slate-900">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm text-slate-600 mt-1">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </header>
      )}

      <div className={cn("space-y-3", contentClassName)}>{children}</div>
    </section>
  );
}
