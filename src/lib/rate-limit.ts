const windows = new Map<string, { count: number; resetAt: number }>();

/** Small per-process guardrail; production should also enable the host/WAF rate limiter. */
export function allowRequest(request: Request, scope: string, limit = 10, durationMs = 60_000) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = request.headers.get("x-real-ip") ?? forwarded ?? "unknown";
  const now = Date.now();
  if (windows.size > 10_000) for (const [key, value] of windows) if (value.resetAt <= now) windows.delete(key);
  const key = `${scope}:${ip}`;
  const current = windows.get(key);
  if (!current || current.resetAt <= now) { windows.set(key, { count: 1, resetAt: now + durationMs }); return true; }
  if (current.count >= limit) return false;
  current.count += 1;
  return true;
}
