"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { useToast } from "@/lib/hooks/useToast";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


// Static generation'ı engelle
export default function PhoneLoginPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { success, error } = useToast();
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanedPhone = phoneNumber.replace(/\D/g, "");
    if (cleanedPhone.length < 10) {
      error("Lütfen geçerli bir telefon numarası girin");
      return;
    }

    setIsSending(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanedPhone }),
      });

      const data = await res.json();

      if (!res.ok) {
        error(data.error || "Kod gönderilemedi");
        return;
      }

      success("Kod gönderildi! SMS'inizi kontrol edin.");
      setStep("code");
      setCountdown(60);

      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      error("Bir hata oluştu");
    } finally {
      setIsSending(false);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleCodeKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = verificationCode.join("");
    if (code.length !== 6) {
      error("Lütfen 6 haneli kodu girin");
      return;
    }

    setIsVerifying(true);
    try {
      const cleanedPhone = phoneNumber.replace(/\D/g, "");
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: cleanedPhone,
          code: code,
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        error(data.error || "Kod doğrulanamadı");
        return;
      }

      success("Giriş başarılı!");
      const redirect = searchParams.get("redirect") || "/account";
      router.push(redirect);
      router.refresh();
    } catch (err) {
      error("Bir hata oluştu");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 border-slate-200 shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FF6000] flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">
              {step === "phone" ? "Telefon ile Giriş" : "Doğrulama Kodu"}
            </CardTitle>
            <CardDescription>
              {step === "phone"
                ? "Telefon numaranızı girin, size SMS ile kod gönderelim."
                : `${phoneNumber} numarasına gönderilen kodu girin.`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {step === "phone" ? (
                <motion.form
                  key="phone"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleSendCode}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-slate-900 font-semibold"
                    >
                      Telefon Numarası
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+90 5XX XXX XX XX"
                        value={phoneNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          if (value.length <= 11) {
                            setPhoneNumber(value);
                          }
                        }}
                        required
                        className="pl-10 h-12 border-2 border-slate-200 focus:border-[#FF6000]"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#FF6000] hover:bg-[#FF5500] text-white font-semibold"
                    disabled={isSending}
                  >
                    {isSending ? (
                      "Kod gönderiliyor..."
                    ) : (
                      <>
                        Kod Gönder
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </motion.form>
              ) : (
                <motion.form
                  key="code"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleVerifyCode}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <Label className="text-slate-900 font-semibold text-center block">
                      6 Haneli Doğrulama Kodu
                    </Label>
                    <div className="flex gap-2 justify-center">
                      {verificationCode.map((digit, index) => (
                        <Input
                          key={index}
                          id={`code-${index}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) =>
                            handleCodeChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleCodeKeyDown(index, e)}
                          className="w-12 h-14 text-center text-2xl font-bold border-2 border-slate-200 focus:border-[#FF6000] focus:ring-2 focus:ring-[#FF6000]/20"
                        />
                      ))}
                    </div>
                    {countdown > 0 && (
                      <p className="text-center text-sm text-slate-500">
                        Kod tekrar gönderilebilir: {countdown} saniye
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setStep("phone");
                        setVerificationCode(["", "", "", "", "", ""]);
                        setCountdown(0);
                      }}
                      className="flex-1 h-12"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Geri
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 h-12 bg-[#FF6000] hover:bg-[#FF5500] text-white font-semibold"
                      disabled={isVerifying || verificationCode.some((d) => !d)}
                    >
                      {isVerifying ? (
                        "Doğrulanıyor..."
                      ) : (
                        <>
                          Doğrula
                          <CheckCircle2 className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="mt-6 text-center">
              <Link
                href="/auth/login"
                className="text-sm text-[#FF6000] hover:underline font-semibold"
              >
                E-posta ile giriş yap
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
