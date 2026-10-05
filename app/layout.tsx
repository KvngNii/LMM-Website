import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lavittamm.com"),
  title: "LMM Africa | Build a brand that converts",
  description:
    "La’vitta Marketing Management is a full service creative marketing team for founders, creatives and changemakers. In house marketing, without the overhead.",
  openGraph: {
    title: "LMM Africa | Build a brand that converts",
    description: "In house marketing, without the overhead. Strategy, brand, content and growth from one team.",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#191919", width: "device-width", initialScale: 1 };

const preload = ["Manrope-Medium", "Manrope-SemiBold", "FreightDispProBook-Italic"];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <style dangerouslySetInnerHTML={{ __html: "html.js .reveal{visibility:hidden}" }} />
        <noscript><style>{".reveal{visibility:visible!important}"}</style></noscript>
        {preload.map((f) => (
          <link key={f} rel="preload" as="font" type="font/woff2" href={`/fonts/${f}.woff2`} crossOrigin="anonymous" />
        ))}
      </head>
      <body>
        <CartProvider>
          <SmoothScroll />
          <Nav />
          <CartDrawer />
          <main className="relative z-10 bg-ivory">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
