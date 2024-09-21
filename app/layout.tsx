import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeSwitcher from "@/app/components/ThemeSwitcher";
import AuthButton from "@/app/components/AuthButton";
import Logo from "@/app/components/Logo"
import { AuthProvider } from "@/contexts/AuthContext";
import { ProfileProvider} from "@/contexts/ProfileContext";

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
            <ProfileProvider>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
            <header className="absolute top-0 left-0 w-full flex bg-base-300 items-center justify-between p-2">
                <div className="flex-1 flex justify-start items-center ml-2">
                    <Logo/>
                </div>
                <div className="flex-1 flex justify-center items-center">
                </div>
                <div className="flex-1 flex justify-end items-center">
                    <ThemeSwitcher />
                    <AuthButton />
                </div>
            </header>
            <main>{children}</main>
            </body>
            </ProfileProvider>
        </AuthProvider>
        </html>
    );
}