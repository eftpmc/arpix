"use client"

import {useAuth} from "@/contexts/AuthContext";

export default function SignInButton() {
    const {signIn} = useAuth(); // Get the signIn function from the context

    return (
        <button
            onClick={signIn}
            className="btn bg-base-content hover:bg-primary text-base-100 border-none rounded-full"
        >
            Get Started
        </button>
    );
}