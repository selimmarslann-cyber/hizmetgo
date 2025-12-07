/**
 * DATABASE_URL validation helper
 * Ensures DATABASE_URL is in the correct format for Prisma
 */

export function validateDatabaseUrl(): void {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL environment variable is not set. Please set it in your .env file.",
    );
  }

  // Prisma requires DATABASE_URL to start with postgresql:// or postgres://
  if (
    !databaseUrl.startsWith("postgresql://") &&
    !databaseUrl.startsWith("postgres://")
  ) {
    // Try to fix common issues
    let fixedUrl = databaseUrl;

    // If it starts with https:// (Supabase connection string sometimes)
    if (databaseUrl.startsWith("https://")) {
      console.warn(
        "⚠️  DATABASE_URL starts with https://. This is likely a Supabase connection string issue.",
      );
      console.warn(
        "Please use the PostgreSQL connection string from Supabase Dashboard > Settings > Database",
      );
      throw new Error(
        "DATABASE_URL must start with postgresql:// or postgres://. " +
          "If you are using Supabase, please use the PostgreSQL connection string, not the API URL.",
      );
    }

    // If it's missing the protocol entirely
    if (!databaseUrl.includes("://")) {
      console.warn(
        `⚠️  DATABASE_URL is missing protocol. Current value: ${databaseUrl.substring(0, 50)}...`,
      );
      throw new Error(
        "DATABASE_URL must start with postgresql:// or postgres://. " +
          "Please check your .env file and update DATABASE_URL with the correct format. " +
          "Example: postgresql://user:password@host:5432/database",
      );
    } else {
      throw new Error(
        `DATABASE_URL must start with postgresql:// or postgres://. Current value starts with: ${databaseUrl.substring(0, 30)}...`,
      );
    }
  }
}

/**
 * Get validated DATABASE_URL
 */
export function getDatabaseUrl(): string {
  validateDatabaseUrl();
  return process.env.DATABASE_URL!;
}
