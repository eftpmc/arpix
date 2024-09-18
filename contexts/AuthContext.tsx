"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from '@supabase/supabase-js';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const supabase = createClient();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
            console.error("Error fetching user:", error.message);
            setUser(null);
        } else {
            setUser(data.user);
        }
        setLoading(false);
    };

    // Sign out function
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error signing out:", error.message);
        } else {
            setUser(null); // Clear user after successful sign out
        }
    };

    // Sign in function
    const signIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.origin,
                queryParams: {
                    access_type: "offline",
                    prompt: "consent",
                },
            },
        });

        if (error) {
            console.error("Error signing in:", error.message);
        } else {
            fetchUser(); // Refresh the user after successful sign in
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, fetchUser, signIn, signOut }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook to use AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};