"use client"

import { useAuth } from "@/contexts/AuthContext";

const AuthButton = () => {
    const { user, signIn, signOut } = useAuth();

    if (!user) {
        return (
            <button
                className="btn bg-base-content hover:bg-primary text-base-100 rounded-full"
                onClick={signIn} // Use the signIn function from the context
            >
                Login
            </button>
        );
    }

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-secondary">
                Account
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                    <button onClick={signOut}>Sign Out</button>
                </li>
            </ul>
        </div>
    );
};

export default AuthButton;