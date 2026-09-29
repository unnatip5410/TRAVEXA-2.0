import type { Metadata } from "next";
import "./globals.css";
import { PreferencesProvider, WelcomeGate } from "@/components/Preferences";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: "TRAVEXA | Premium Travel Discovery, Planning & Assistance",
  description: "Explore India and discover the world with intention. Intelligent AI planning, verified routes, stays, and unhurried journeys.",
  keywords: ["travel discovery", "trip planner", "incredible india", "luxury travel", "slow travel", "ai travel assistant"],
  openGraph: {
    title: "TRAVEXA | Explore India. Discover the World.",
    description: "Meaningful miles, beautifully planned.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <PreferencesProvider>
          <WelcomeGate>{children}</WelcomeGate>
        </PreferencesProvider>
      </body>
    </html>
  );
}
