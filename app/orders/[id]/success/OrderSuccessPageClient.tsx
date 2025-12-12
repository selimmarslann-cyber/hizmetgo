"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function OrderSuccessPageClient() {
  const router = useRouter();
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  const [MotionComponents, setMotionComponents] = useState<{
    MotionDiv: any;
    MotionSpan?: any;
    MotionButton?: any;
    MotionP?: any;
    AnimatePresence?: any;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
    import("framer-motion").then((mod) => {
      setMotionComponents({
        MotionDiv: mod.motion.div,
        MotionSpan: mod.motion.span,
        MotionButton: mod.motion.button,
        MotionP: mod.motion.p,
        AnimatePresence: mod.AnimatePresence,
      });
    });
  }, []);

  if (!mounted || !MotionComponents) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <MotionComponents.MotionDiv
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
        suppressHydrationWarning
      >
        <Card>
          <CardContent className="p-8 text-center">
            <MotionComponents.MotionDiv
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
                delay: 0.2,
              }}
              className="mb-6"
              suppressHydrationWarning
            >
              <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto" />
            </MotionComponents.MotionDiv>

            <MotionComponents.MotionDiv
              as="h1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold mb-4"
              suppressHydrationWarning
            >
              İş başarıyla tamamlandı
            </MotionComponents.MotionDiv>

            <MotionComponents.MotionP
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mb-8"
              suppressHydrationWarning
            >
              Hizmetin tamamlandığını onayladık. Deneyimini paylaşmak ister
              misin?
            </MotionComponents.MotionP>

            <MotionComponents.MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
              suppressHydrationWarning
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
            </MotionComponents.MotionDiv>
          </CardContent>
        </Card>
      </MotionComponents.MotionDiv>
    </div>
  );
}
