"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const STORAGE_KEY = "hasSeenPartnerIntro";

export default function PartnerIntroDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // LocalStorage kontrolü
    const hasSeen = localStorage.getItem(STORAGE_KEY);
    if (hasSeen !== "true") {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  const handleDetails = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
    router.push("/partner");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            0 yatırımla bu mahallenin ortağı ol!
          </DialogTitle>
          <DialogDescription className="pt-4 space-y-3 text-sm text-muted-foreground">
            <p>
              Uygulamayı ne kadar çok kişi kullanırsa, mahallende dönen her
              işten o kadar pay alabilirsin.
            </p>
            <p>Ne şirket kurmana gerek var, ne sermaye bağlamana.</p>
            <p>Sadece davet et, sipariş geldikçe kazan.</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            className="w-full sm:w-auto"
          >
            Sonra bakarım
          </Button>
          <Button onClick={handleDetails} className="w-full sm:w-auto">
            Detaylar için tıkla
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
