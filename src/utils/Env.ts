export function requiredEnv(env: string | undefined): string {
  if (env !== undefined) return env;
  throw new Error('Please assign dotenv parameters.');
}
