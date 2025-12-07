"use client";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        backgroundColor: "#0f172a",
        color: "white",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>
        Bir hata oluştu
      </h1>
      <p style={{ opacity: 0.8, marginBottom: "24px", maxWidth: "400px" }}>
        Sayfa yüklenirken beklenmeyen bir hata oluştu. Lütfen sayfayı
        yenilemeyi deneyin. Sorun devam ederse daha sonra tekrar deneyin.
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
            color: "#0f172a",
            fontWeight: 600,
          }}
        >
          Tekrar dene
        </button>
        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              window.location.href = "/";
            }
          }}
          style={{
            padding: "8px 16px",
            borderRadius: "999px",
            border: "1px solid rgba(148, 163, 184, 0.5)",
            cursor: "pointer",
            backgroundColor: "transparent",
            color: "white",
          }}
        >
          Ana sayfaya dön
        </button>
      </div>
    </div>
  );
}
