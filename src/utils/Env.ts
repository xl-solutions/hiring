export function requiredEnv(env: string | undefined): string {
  if (env) return env;
  throw new Error('Please assign dotenv parameters.');
}
