export function requiredString(value: unknown, field: string) { if (typeof value !== "string" || !value.trim()) throw new Error(`${field} is required`); return value.trim(); }
export function positiveInt(value: unknown, field: string) { const parsed = Number(value); if (!Number.isInteger(parsed) || parsed < 1) throw new Error(`${field} must be a positive integer`); return parsed; }
export function safeJsonBody(request: Request) { return request.json().catch(() => { throw new Error("Invalid JSON body"); }); }
