"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/useToast";

interface FeedbackButtonProps {
  faqId: string;
  question: string;
}

export default function FeedbackButton({ faqId, question }: FeedbackButtonProps) {
  const { success } = useToast();
  const [feedback, setFeedback] = useState<"helpful" | "not-helpful" | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFeedback = async (type: "helpful" | "not-helpful") => {
    if (submitted) return;

    try {
      // API'ye feedback gönder
      await fetch("/api/support/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ faqId, type, question }),
      });

      setFeedback(type);
      setSubmitted(true);
      success(type === "helpful" ? "Teşekkürler! Geri bildiriminiz kaydedildi." : "Geri bildiriminiz için teşekkürler.");
    } catch (err) {
      // Hata durumunda sessizce devam et, feedback UI'da gösterilir
      setFeedback(type);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-2 text-sm text-emerald-600">
        <CheckCircle2 className="w-4 h-4" />
        <span>Geri bildiriminiz için teşekkürler!</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 pt-4 border-t border-gray-200 mt-4">
      <span className="text-sm text-gray-600">Bu cevap yardımcı oldu mu?</span>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleFeedback("helpful")}
          className={`h-8 ${feedback === "helpful" ? "bg-emerald-50 border-emerald-300 text-emerald-700" : ""}`}
        >
          <ThumbsUp className="w-4 h-4 mr-1" />
          Evet
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleFeedback("not-helpful")}
          className={`h-8 ${feedback === "not-helpful" ? "bg-red-50 border-red-300 text-red-700" : ""}`}
        >
          <ThumbsDown className="w-4 h-4 mr-1" />
          Hayır
        </Button>
      </div>
    </div>
  );
}

