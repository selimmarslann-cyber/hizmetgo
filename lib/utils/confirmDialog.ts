/**
 * Confirm Dialog Utility
 *
 * Native confirm() yerine kullanılacak utility
 * Dialog component ile entegre edilecek
 */

"use client";

export interface ConfirmOptions {
  title?: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
}

export type ConfirmHandler = (options: ConfirmOptions) => Promise<boolean>;

let globalConfirmHandler: ConfirmHandler | null = null;

export function setGlobalConfirmHandler(handler: ConfirmHandler) {
  globalConfirmHandler = handler;
}

export async function confirmDialog(options: ConfirmOptions): Promise<boolean> {
  if (globalConfirmHandler) {
    return globalConfirmHandler(options);
  }
  // Fallback to native confirm
  return window.confirm(options.description);
}
