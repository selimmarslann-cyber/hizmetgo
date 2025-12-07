"use client";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import SupportChatWidget from "@/components/support/SupportChatWidget";


// Static generation'ı engelle
export default function ChatPageClient() {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="h-[600px] overflow-hidden">
          <SupportChatWidget
            onClose={() => window.history.back()}
            onMinimize={() => setIsMinimized(!isMinimized)}
            isMinimized={isMinimized}
          />
        </Card>
      </div>
    </div>
  );
}
