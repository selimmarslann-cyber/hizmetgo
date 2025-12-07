/**
 * UI Design Tokens
 *
 * Tasarım tutarlılığı için ortak değerler.
 * Bu token'lar tüm component'lerde kullanılmalı.
 */

export const uiTokens = {
  // Colors
  colors: {
    primary: "#FF6000",
    primarySoft: "#FFF5F0",
    primaryHover: "#FF4500",

    background: "#F5F5F7",
    backgroundSoft: "#FAFAFA",
    backgroundElevated: "#FFFFFF",

    text: {
      primary: "#1D1D1F",
      secondary: "#6E6E73",
      tertiary: "#86868B",
      inverse: "#FFFFFF",
    },

    border: {
      default: "#D2D2D7",
      soft: "#E5E5EA",
      focus: "#FF6000",
    },

    status: {
      success: "#34C759",
      warning: "#FF9500",
      error: "#FF3B30",
      info: "#007AFF",
    },
  },

  // Radius
  radius: {
    none: "0",
    sm: "0.375rem", // 6px
    md: "0.5rem", // 8px
    lg: "0.75rem", // 12px
    xl: "1rem", // 16px
    "2xl": "1.25rem", // 20px
    "3xl": "1.5rem", // 24px
    full: "9999px",
  },

  // Shadows
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    card: "0 2px 8px rgba(0, 0, 0, 0.08)",
    elevated: "0 4px 16px rgba(0, 0, 0, 0.12)",
  },

  // Spacing
  spacing: {
    section: {
      padding: "2rem", // 32px
      gap: "2rem", // 32px
    },
    page: {
      maxWidth: "1200px",
      padding: "1rem", // 16px mobile, 2rem desktop
      paddingDesktop: "2rem", // 32px
    },
    card: {
      padding: "1.5rem", // 24px
      gap: "1rem", // 16px
    },
  },

  // Typography
  typography: {
    fontFamily: {
      sans: [
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "sans-serif",
      ],
    },
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
  },

  // Animation
  animation: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
    easing: {
      default: "cubic-bezier(0.4, 0, 0.2, 1)",
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
      inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
} as const;

/**
 * Helper function to get Tailwind-compatible classes from tokens
 */
export function getCardClasses(additionalClasses = "") {
  return `rounded-${uiTokens.radius.xl} shadow-${uiTokens.shadows.card} bg-${uiTokens.colors.backgroundElevated} border border-${uiTokens.colors.border.soft} ${additionalClasses}`;
}

/**
 * Helper for section wrapper
 */
export function getSectionClasses() {
  return `max-w-${uiTokens.spacing.page.maxWidth} mx-auto px-${uiTokens.spacing.page.padding} py-${uiTokens.spacing.section.padding}`;
}
