ALTER TABLE "Trip" ADD COLUMN "travelDate" TIMESTAMP(3);
ALTER TABLE "Trip" ADD COLUMN "preferences" JSONB;
ALTER TABLE "Trip" ADD COLUMN "travelers" JSONB;
ALTER TABLE "Review" ADD COLUMN "approved" BOOLEAN NOT NULL DEFAULT false;

CREATE TABLE "Visitor" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "destination" TEXT,
  "message" TEXT,
  "consent" BOOLEAN NOT NULL DEFAULT false,
  "status" TEXT NOT NULL DEFAULT 'NEW',
  "userId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "Visitor_createdAt_idx" ON "Visitor"("createdAt");
CREATE INDEX "Visitor_email_idx" ON "Visitor"("email");
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
