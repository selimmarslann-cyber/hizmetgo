"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Coins } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Navbar için mini referral balance widget
 */
export default function ReferralBalanceWidget() {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBalance();
  }, []);

  const loadBalance = async () => {
    try {
      const res = await fetch("/api/referral/overview", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setBalance(data.currentBalance);
      }
    } catch (err) {
      // Hata durumunda widget gösterilmez
    } finally {
      setLoading(false);
    }
  };

  if (loading || balance === null || balance === 0) {
    return null;
  }

  return (
    <Link href="/referral">
      <Button
        variant="ghost"
        size="sm"
        className="text-green-600 hover:text-green-700"
      >
        <Coins className="w-4 h-4 mr-1" />
        <span className="hidden sm:inline">{balance.toFixed(2)} ₺</span>
        <span className="sm:hidden">Kazanç</span>
      </Button>
    </Link>
  );
}
