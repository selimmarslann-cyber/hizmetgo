"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFieldValidation, ValidationRule } from "@/lib/utils/formValidation";
import { cn } from "@/lib/utils/cn";

interface InputWithValidationProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  rules?: ValidationRule[];
  validateOnChange?: boolean;
  errorClassName?: string;
}

export function InputWithValidation({
  label,
  rules = [],
  validateOnChange = true,
  errorClassName,
  className,
  ...props
}: InputWithValidationProps) {
  const validation = useFieldValidation(
    props.value || "",
    rules,
    validateOnChange,
  );

  return (
    <div className="space-y-2">
      {label && (
        <Label
          htmlFor={props.id}
          className={cn(validation.showError && "text-red-500")}
        >
          {label}
        </Label>
      )}
      <Input
        {...props}
        className={cn(
          validation.showError && "border-red-500 focus-visible:ring-red-500",
          className,
        )}
        aria-invalid={validation.showError}
        aria-describedby={
          validation.showError ? `${props.id}-error` : undefined
        }
      />
      {validation.showError && validation.errors.length > 0 && (
        <div
          id={`${props.id}-error`}
          className={cn("text-sm text-red-500", errorClassName)}
          role="alert"
        >
          {validation.errors[0]}
        </div>
      )}
    </div>
  );
}
