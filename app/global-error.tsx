"use client";
import { useEffect } from "react";

type RootErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function RootError({ error, reset }: RootErrorProps) {
  useEffect(() => {
    console.error("[ROOT ERROR]", error);
  }, [error]);

  return (
    <html lang="tr">
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            backgroundColor: "#020617",
            color: "white",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>
            Sistemsel bir hata oluştu
          </h1>
          <p style={{ opacity: 0.8, marginBottom: "24px", maxWidth: "420px" }}>
            Uygulama beklenmedik bir hata nedeniyle şu anda çalışamıyor. Sayfayı
            yenileyebilir veya ana sayfaya dönebilirsiniz.
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => reset()}
              style={{
                padding: "8px 16px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "white",
                color: "#020617",
                fontWeight: 600,
              }}
            >
              Tekrar dene
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              style={{
                padding: "8px 16px",
                borderRadius: "999px",
                border: "1px solid rgba(148, 163, 184, 0.5)",
                cursor: "pointer",
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              Ana sayfa
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
