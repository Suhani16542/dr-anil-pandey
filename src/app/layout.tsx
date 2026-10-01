import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Dr. Anil Pandey | Medical Consultations & Clinical Practice",
    template: "%s | Dr. Anil Pandey",
  },
  description:
    "Official website of Dr. Anil Pandey. Book appointments, explore consultation options, and access professional medical guidance.",
  keywords: [
    "Dr. Anil Pandey",
    "Medical Consultation",
    "Doctor Appointment",
    "Clinical Practice",
    "Healthcare Consultation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col bg-white text-zinc-900 selection:bg-brand-100 selection:text-brand-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
