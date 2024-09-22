"use client"

import {useAuth} from "@/contexts/AuthContext";
import {Menu} from 'lucide-react'

const AuthButton = () => {
    const {user, signIn, signOut} = useAuth();

    if (!user) {
        return (
            <button
                className="btn bg-base-content hover:bg-primary border-none text-base-100 mx-2"
                onClick={signIn} // Use the signIn function from the context
            >
                Login
            </button>
        );
    }

    return (
        <div className="dropdown dropdown-end px-2">
            <label tabIndex={0} className="btn bg-base-content border-none hover:bg-primary text-base-100">
                <Menu className="w-6 h-6"/>
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                    <button className="text-base-content" onClick={signOut}>Sign Out</button>
                </li>
            </ul>
        </div>
    );
};

export default AuthButton;