const required = (name: string) => {
  const value = process.env[name];
  if (!value && process.env.NODE_ENV === "production") throw new Error(`Missing required environment variable: ${name}`);
  return value ?? "";
};

export const env = {
  databaseUrl: () => required("DATABASE_URL"),
  authSecret: () => required("AUTH_SECRET"),
  aiApiKey: () => process.env.TRAVEXA_AI_API_KEY ?? "",
  aiBaseUrl: () => process.env.TRAVEXA_AI_BASE_URL ?? "",
  razorpayKeyId: () => process.env.RAZORPAY_KEY_ID ?? "",
  razorpayKeySecret: () => process.env.RAZORPAY_KEY_SECRET ?? "",
  razorpayWebhookSecret: () => process.env.RAZORPAY_WEBHOOK_SECRET ?? "",
  siteUrl: () => process.env.SITE_URL ?? "",
};
