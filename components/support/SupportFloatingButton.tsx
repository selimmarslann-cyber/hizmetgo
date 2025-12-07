"use client";

import { useState, useEffect } from "react";
import { MessageSquare, X, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SupportChatWidget from "./SupportChatWidget";

export default function SupportFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Unread mesaj sayısını kontrol et
  useEffect(() => {
    if (!isOpen) {
      const checkUnread = async () => {
        try {
          const res = await fetch("/api/support/unread-count", {
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            setUnreadCount(data.count || 0);
          }
        } catch (err) {
          // Hata durumunda sessizce geç
        }
      };
      checkUnread();
      const interval = setInterval(checkUnread, 30000); // 30 saniyede bir kontrol et
      return () => clearInterval(interval);
    } else {
      setUnreadCount(0); // Açıkken unread sayısını sıfırla
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-[#FF6000] hover:bg-[#FF7000] text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
            aria-label="Canlı Destek"
          >
            <MessageSquare className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
            {/* Tooltip */}
            <span className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Canlı Destek
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed ${isMinimized ? "bottom-6 right-6 w-80" : "bottom-6 right-6 w-96 h-[600px]"} z-[9999] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-200`}
          >
            <SupportChatWidget
              onClose={() => setIsOpen(false)}
              onMinimize={() => setIsMinimized(!isMinimized)}
              isMinimized={isMinimized}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
