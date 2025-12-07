"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/lib/hooks/useToast";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


// Static generation'ı engelle
export default function EmailLoginPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { success, error } = useToast();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState<"email" | "code" | "password">("email");
  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Countdown timer cleanup
  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, []);

  const handleSendCode = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (!email) {
      error("Lütfen e-posta adresinizi girin");
      return;
    }

    // Email format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      error("Lütfen geçerli bir e-posta adresi girin");
      return;
    }

    setSendingCode(true);

    // Debug: Check if fetch is available
    if (typeof fetch === "undefined") {
      console.error("❌ Fetch is not available!");
      error("Tarayıcı fetch API desteklemiyor");
      setSendingCode(false);
      return;
    }

    try {
      console.log("📧 Frontend: Starting send code request...");
      console.log("📧 Frontend: Email:", email);
      console.log("📧 Frontend: Request URL:", "/api/auth/send-code");

      const requestBody = JSON.stringify({ email });
      console.log("📧 Frontend: Request body:", requestBody);

      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
        credentials: "include",
      });

      console.log("📧 Frontend: Fetch completed");
      console.log("📧 Frontend: Response received:", res);

      console.log("📧 Frontend: Response status:", res.status);
      console.log("📧 Frontend: Response ok:", res.ok);

      // Response body'yi oku
      const contentType = res.headers.get("content-type");
      console.log("📧 Frontend: Content-Type:", contentType);

      let data;
      try {
        if (contentType?.includes("application/json")) {
          data = await res.json();
          console.log("📧 Frontend: Response data:", data);
        } else {
          const text = await res.text();
          console.error("📧 Frontend: Non-JSON response:", text);
          error("Sunucudan beklenmeyen yanıt alındı. Lütfen tekrar deneyin.");
          setSendingCode(false);
          return;
        }
      } catch (parseError: any) {
        console.error("📧 Frontend: JSON parse error:", parseError);
        try {
          const text = await res.text();
          console.error("📧 Frontend: Response text:", text);
        } catch (textError) {
          console.error("📧 Frontend: Could not read response text");
        }
        error("Sunucudan geçersiz yanıt alındı. Lütfen tekrar deneyin.");
        setSendingCode(false);
        return;
      }

      if (!res.ok) {
        console.error("📧 Frontend: API error:", data);
        const errorMsg =
          data?.error || data?.message || `Sunucu hatası (${res.status})`;
        error(errorMsg);
        setSendingCode(false);
        return;
      }

      console.log("Code sent successfully, switching to code step");
      success("Doğrulama kodu e-posta adresinize gönderildi");
      setStep("code");
      setCountdown(300); // 5 dakika (300 saniye)

      // Countdown timer başlat
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (countdownIntervalRef.current) {
              clearInterval(countdownIntervalRef.current);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Development mode'da kodu göster
      if (data.mockCode) {
        console.log("Development OTP Code:", data.mockCode);
        success(`Development Mode: Kod ${data.mockCode}`);
      }
    } catch (err: any) {
      console.error("📧 Frontend: Send code error:", err);
      console.error("📧 Frontend: Error type:", err?.constructor?.name);
      console.error("📧 Frontend: Error message:", err?.message);
      console.error("📧 Frontend: Error stack:", err?.stack);

      let errorMessage = "Bir hata oluştu. Lütfen tekrar deneyin.";

      if (err instanceof TypeError && err.message.includes("fetch")) {
        errorMessage =
          "Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.";
      } else if (err.message) {
        errorMessage = err.message;
      }

      error(errorMessage);
      alert(
        `Hata: ${errorMessage}\n\nKonsolu kontrol edin (F12) daha fazla bilgi için.`,
      );
    } finally {
      setSendingCode(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      error("Lütfen 6 haneli kodu girin");
      return;
    }

    setLoading(true);
    try {
      // Sadece kodu doğrula, şifre ekranına geç
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        error(data.error || "Kod doğrulanamadı");
        return;
      }

      // Kod doğrulandı, şifre ekranına geç
      setStep("password");
      success("Kod doğrulandı. Şimdi şifrenizi belirleyin.");
    } catch (err) {
      error("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      error("Şifre en az 6 karakter olmalı");
      return;
    }

    if (password !== confirmPassword) {
      error("Şifreler eşleşmiyor");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        error(data.error || "Şifre belirlenemedi");
        return;
      }

      success("Şifreniz belirlendi! Giriş yapılıyor...");

      // Anasayfaya yönlendir
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1000);
    } catch (err) {
      error("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-[#FF6000] rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">
              E-posta ile Giriş
            </CardTitle>
            <CardDescription>
              {step === "email"
                ? "E-posta adresinize doğrulama kodu göndereceğiz"
                : step === "code"
                  ? "E-posta adresinize gönderilen 6 haneli kodu girin"
                  : "Yeni şifrenizi belirleyin"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "email" ? (
              <form
                onSubmit={(e) => {
                  console.log("📝 Form submitted");
                  handleSendCode(e);
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta Adresi</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ornek@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={sendingCode}
                    className="h-12"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#FF6000] hover:bg-[#FF5500] text-white h-12"
                  disabled={sendingCode || !email}
                >
                  {sendingCode ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      Kodu Gönder
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
                {sendingCode && (
                  <p className="text-xs text-center text-slate-500 mt-2">
                    E-posta gönderiliyor, lütfen bekleyin...
                  </p>
                )}
                {/* Debug: Test API button */}
                {process.env.NODE_ENV === "development" && (
                  <button
                    type="button"
                    onClick={async () => {
                      console.log("🧪 Testing API...");
                      try {
                        const res = await fetch("/api/test/send-code");
                        const data = await res.json();
                        console.log("🧪 Test result:", data);
                        alert(`Test Result:\n${JSON.stringify(data, null, 2)}`);
                      } catch (err) {
                        console.error("🧪 Test error:", err);
                        alert(`Test Error: ${err}`);
                      }
                    }}
                    className="mt-2 text-xs text-blue-600 hover:underline"
                  >
                    🧪 Test API Connection
                  </button>
                )}
              </form>
            ) : step === "code" ? (
              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Doğrulama Kodu</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="123456"
                    value={code}
                    onChange={(e) =>
                      setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    required
                    disabled={loading}
                    className="h-12 text-center text-2xl tracking-widest font-mono"
                    maxLength={6}
                    autoFocus
                  />
                  <p className="text-xs text-slate-500 text-center">
                    {email} adresine gönderilen kodu girin
                  </p>
                  {countdown > 0 && (
                    <p className="text-xs text-slate-500 text-center">
                      Kod süresi: {Math.floor(countdown / 60)}:
                      {(countdown % 60).toString().padStart(2, "0")}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#FF6000] hover:bg-[#FF5500] text-white h-12"
                  disabled={loading || code.length !== 6}
                >
                  {loading ? "Doğrulanıyor..." : "Kodu Doğrula"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <div className="text-center space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("email");
                      setCode("");
                      setCountdown(0);
                      if (countdownIntervalRef.current) {
                        clearInterval(countdownIntervalRef.current);
                      }
                    }}
                    className="text-sm text-slate-600 hover:text-[#FF6000]"
                  >
                    Farklı e-posta kullan
                  </button>
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        if (countdown === 0 || countdown < 60) {
                          handleSendCode();
                        }
                      }}
                      className={`text-sm ${
                        countdown > 0 && countdown >= 60
                          ? "text-slate-400 cursor-not-allowed"
                          : "text-[#FF6000] hover:underline"
                      }`}
                      disabled={
                        sendingCode || (countdown > 0 && countdown >= 60)
                      }
                    >
                      {sendingCode
                        ? "Gönderiliyor..."
                        : countdown > 0 && countdown >= 60
                          ? `Kodu tekrar gönder (${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, "0")})`
                          : "Kodu tekrar gönder"}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Yeni Şifre</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="En az 6 karakter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="h-12"
                    minLength={6}
                  />
                  <p className="text-xs text-slate-500">
                    Şifreniz en az 6 karakter olmalıdır
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Şifrenizi tekrar girin"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="h-12"
                    minLength={6}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#FF6000] hover:bg-[#FF5500] text-white h-12"
                  disabled={
                    loading ||
                    password.length < 6 ||
                    password !== confirmPassword
                  }
                >
                  {loading ? "Kaydediliyor..." : "Şifreyi Belirle ve Giriş Yap"}
                  <Lock className="w-4 h-4 ml-2" />
                </Button>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("code");
                      setPassword("");
                      setConfirmPassword("");
                    }}
                    className="text-sm text-slate-600 hover:text-[#FF6000]"
                  >
                    ← Geri
                  </button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
