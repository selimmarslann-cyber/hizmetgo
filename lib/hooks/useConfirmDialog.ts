"use client";

import { useState, useCallback } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { createElement } from "react";

export interface ConfirmOptions {
  title?: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
}

export function useConfirmDialog() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({
    description: "",
  });
  const [resolvePromise, setResolvePromise] = useState<
    ((value: boolean) => void) | null
  >(null);

  const confirm = useCallback((opts: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setOptions(opts);
      setOpen(true);
      setResolvePromise(() => resolve);
    });
  }, []);

  const handleConfirm = useCallback(() => {
    if (resolvePromise) {
      resolvePromise(true);
      setResolvePromise(null);
    }
    setOpen(false);
  }, [resolvePromise]);

  const handleCancel = useCallback(() => {
    if (resolvePromise) {
      resolvePromise(false);
      setResolvePromise(null);
    }
    setOpen(false);
  }, [resolvePromise]);

  const ConfirmDialogComponent = createElement(ConfirmDialog, {
    open,
    onOpenChange: setOpen,
    title: options.title,
    description: options.description,
    confirmText: options.confirmText,
    cancelText: options.cancelText,
    variant: options.variant,
    onConfirm: handleConfirm,
    onCancel: handleCancel,
  });

  return {
    confirm,
    ConfirmDialog: ConfirmDialogComponent,
  };
}
