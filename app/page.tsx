"use client"

import { useAuth } from "@/contexts/AuthContext";
import Dashboard from "@/app/components/Dashboard"; // AuthenticatedUser component
import Login from "@/app/components/Login"; // NonAuthenticatedUser component

export default function Home() {
    const { user } = useAuth(); // Use authentication context to get the user

    return (
        <div className="flex bg-base-300 items-center justify-center min-h-screen p-4 py-20 font-[family-name:var(--font-geist-sans)]">
                {user ? <Dashboard user={user} /> : <Login />}
        </div>
    );
}
