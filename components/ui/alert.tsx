import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive" | "warning" | "success";
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative w-full rounded-lg border p-4",
          variant === "destructive" &&
            "border-red-200 bg-red-50 text-red-800",
          variant === "warning" &&
            "border-yellow-200 bg-yellow-50 text-yellow-800",
          variant === "success" &&
            "border-green-200 bg-green-50 text-green-800",
          variant === "default" &&
            "border-gray-200 bg-gray-50 text-gray-800",
          className,
        )}
        {...props}
      />
    );
  },
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
