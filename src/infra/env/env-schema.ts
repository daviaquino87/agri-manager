import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('test'),
  DATABASE_URL: z.string(),
});

export type EnvSchema = z.infer<typeof envSchema>;
