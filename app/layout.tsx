import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeSwitcher from "@/app/components/ThemeSwitcher";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthButton from "@/app/components/AuthButton";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "arpi",
    description: "AI visualization tools",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <AuthProvider>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
            <header className="absolute top-0 left-0 w-full flex bg-base-300 items-center justify-between p-2">
                <div className="flex-1" />
                <div className="flex-1 text-center">
                    <h1 className="text-xl font-bold text-base-content">arpi</h1>
                </div>
                <div className="flex-1 flex justify-end items-center">
                    <ThemeSwitcher />
                    <AuthButton /> {/* Add AuthButton next to the ThemeSwitcher */}
                </div>
            </header>
            <main>{children}</main>
            </body>
        </AuthProvider>
        </html>
    );
}