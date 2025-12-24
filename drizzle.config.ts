import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/models/Schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    // Use the POOLER string with your new password
    url: 'postgresql://postgres.cyotkbypkxtuukabkbca:X1kHWtu62RpzOxJ6@aws-1-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true',
  },
});
// X1kHWtu62RpzOxJ6
