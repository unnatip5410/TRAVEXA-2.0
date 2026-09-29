import { NextResponse } from "next/server";

// This endpoint is intentionally non-charging. A provider-specific create + webhook
// verification flow must be configured before any booking can report payment success.
export async function POST() {
  return NextResponse.json({
    error: "Online payment is not configured. Your trip details have not been charged or confirmed.",
    code: "PAYMENTS_NOT_CONFIGURED",
  }, { status: 503, headers: { "Cache-Control": "no-store" } });
}
