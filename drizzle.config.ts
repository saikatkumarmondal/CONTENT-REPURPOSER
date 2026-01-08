import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/models/Schema.ts', //
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    // 1. Changed port from 6543 to 5432
    // 2. Removed ?pgbouncer=true
    url: 'postgresql://postgres.cyotkbypkxtuukabkbca:X1kHWtu62RpzOxJ6@aws-1-us-west-1.pooler.supabase.com:5432/postgres',
  },
});
