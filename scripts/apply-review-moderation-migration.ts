/**
 * Apply review moderation migration
 */

import { config } from 'dotenv';
import { Client } from 'pg';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load .env file
config();

async function applyMigration() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  const client = new Client({
    connectionString: databaseUrl,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    console.log('✅ Connected to database');

    const migrationPath = join(process.cwd(), 'supabase/migrations/99_add_review_moderation.sql');
    const sql = readFileSync(migrationPath, 'utf8');

    console.log('📝 Applying migration...');
    await client.query(sql);
    console.log('✅ Migration applied successfully');
  } catch (error: any) {
    console.error('❌ Migration error:', error.message);
    throw error;
  } finally {
    await client.end();
    console.log('🔌 Disconnected from database');
  }
}

applyMigration().catch((error) => {
  console.error('❌ Failed:', error);
  process.exit(1);
});

