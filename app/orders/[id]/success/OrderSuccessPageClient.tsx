"use client";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// Static generation'ı engelle
export default function OrderSuccessPageClient() {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
                delay: 0.2,
              }}
              className="mb-6"
            >
              <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold mb-4"
            >
              İş başarıyla tamamlandı
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mb-8"
            >
              Hizmetin tamamlandığını onayladık. Deneyimini paylaşmak ister
              misin?
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <Button
                onClick={() => router.push(`/jobs/${params.id}`)}
                size="lg"
                className="w-full"
              >
                <Star className="w-4 h-4 mr-2" />
                Değerlendir
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => router.push("/jobs")}
                  className="flex-1"
                >
                  İşlerim
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/request")}
                  className="flex-1"
                >
                  Yeni İş Ver
                </Button>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
