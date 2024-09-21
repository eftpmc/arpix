"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

// Define the shape of the profile context
interface ProfileContextType {
    user: User | null;
    functions: FunctionData[];
    updateFunctions: (functions: FunctionData[]) => void;
}

// Define the structure of function data
interface FunctionData {
    id: number;
    name: string;
    code: string;
}

// Create a context with a default value
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Create a provider component
export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [functions, setFunctions] = useState<FunctionData[]>([]);
    const supabase = createClient();

    useEffect(() => {
        const fetchOrCreateUserProfile = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error("Error fetching user:", error.message);
                return;
            }

            if (data.user) {
                setUser(data.user);

                // Check if the user profile exists in the database
                const { data: profile, error: profileError } = await supabase
                    .from("profiles")
                    .select("functions")
                    .eq("id", data.user.id)
                    .single();

                if (profileError) {
                    if (profileError.code === "PGRST116") {
                        // If the profile does not exist, create a new one
                        const { error: insertError } = await supabase
                            .from("profiles")
                            .insert({
                                id: data.user.id,
                                email: data.user.email,
                                functions: [], // Initialize with an empty functions array
                            });

                        if (insertError) {
                            console.error("Error creating profile:", insertError.message);
                        } else {
                            console.log("Profile created successfully.");
                            setFunctions([]); // Set functions to an empty array
                        }
                    } else {
                        console.error("Error fetching profile:", profileError.message);
                    }
                } else {
                    setFunctions(profile?.functions || []);
                }
            }
        };

        fetchOrCreateUserProfile();
    }, [supabase]);

    const updateFunctions = async (updatedFunctions: FunctionData[]) => {
        if (!user) return;

        const { error } = await supabase
            .from("profiles")
            .update({ functions: updatedFunctions })
            .eq("id", user.id);

        if (error) {
            console.error("Error updating functions:", error.message);
        } else {
            setFunctions(updatedFunctions);
        }
    };

    return (
        <ProfileContext.Provider value={{ user, functions, updateFunctions }}>
            {children}
        </ProfileContext.Provider>
    );
};

// Custom hook to use the profile context
export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error("useProfile must be used within a ProfileProvider");
    }
    return context;
};