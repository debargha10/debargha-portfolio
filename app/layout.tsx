import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://debargha-portfolio.vercel.app"),
  title: {
    default: "Debargha Adhikary | AI Developer Portfolio",
    template: "%s | Debargha Adhikary",
  },
  description:
    "Premium portfolio of Debargha Adhikary, an AI Developer, Python Developer, and Creative Technologist from Kolkata, India.",
  keywords: [
    "Debargha Adhikary",
    "AI Developer",
    "Python Developer",
    "Creative Technologist",
    "Next.js Portfolio",
    "Kolkata Developer",
  ],
  authors: [{ name: "Debargha Adhikary" }],
  openGraph: {
    title: "Debargha Adhikary | AI Developer Portfolio",
    description:
      "Futuristic AI systems, immersive digital experiences, and scalable technologies.",
    url: "https://debargha-portfolio.vercel.app",
    siteName: "Debargha Adhikary Portfolio",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Debargha Adhikary | AI Developer Portfolio",
    description:
      "AI Developer, Python Developer, and Creative Technologist from Kolkata.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <div className="noise" aria-hidden="true" />
      </body>
    </html>
  );
}
