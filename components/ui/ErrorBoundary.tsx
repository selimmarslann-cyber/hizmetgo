"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            backgroundColor: "#f9fafb",
          }}
        >
          <div
            style={{
              maxWidth: "400px",
              width: "100%",
              padding: "24px",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 600,
                marginBottom: "12px",
                color: "#dc2626",
              }}
            >
              Bir hata oluştu
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                marginBottom: "16px",
              }}
            >
              Sayfa yüklenirken bir hata oluştu. Lütfen tekrar deneyin.
            </p>
            {this.state.error?.message && (
              <div
                style={{
                  padding: "12px",
                  backgroundColor: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "8px",
                  marginBottom: "16px",
                }}
              >
                <p
                  style={{
                    fontSize: "12px",
                    color: "#991b1b",
                    fontFamily: "monospace",
                  }}
                >
                  {this.state.error.message}
                </p>
              </div>
            )}
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={this.handleReset}
                style={{
                  flex: 1,
                  padding: "8px 16px",
                  backgroundColor: "#dc2626",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Tekrar Dene
              </button>
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.location.href = "/";
                  }
                }}
                style={{
                  flex: 1,
                  padding: "8px 16px",
                  backgroundColor: "transparent",
                  color: "#374151",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Ana Sayfa
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
