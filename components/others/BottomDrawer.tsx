"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X } from "lucide-react";

interface BottomDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const BottomDrawer = ({
  open,
  onOpenChange,
  title,
  children,
  footer,
}: BottomDrawerProps) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/40 duration-200 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Popup className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col rounded-t-3xl border-t border-border bg-background pb-[env(safe-area-inset-bottom)] outline-none duration-200 data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-bottom data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-bottom">
          <div
            aria-hidden
            className="mx-auto mt-3 h-1.5 w-10 shrink-0 rounded-full bg-border"
          />
          <div className="flex shrink-0 items-center justify-between gap-3 px-5 pt-3 pb-1">
            <DialogPrimitive.Title className="font-heading text-base font-semibold">
              {title}
            </DialogPrimitive.Title>
            <DialogPrimitive.Close className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-2 pb-4">
            {children}
          </div>
          {footer && (
            <div className="shrink-0 border-t border-border bg-background px-5 py-4">
              {footer}
            </div>
          )}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
