import {User} from "@supabase/supabase-js";
import Link from "next/link";
import FunctionContainer from "./FunctionContainer";
import {GitGraph, PlusSquare, Terminal} from "lucide-react";
import {useProfile} from "@/contexts/ProfileContext";

export default function Dashboard({user}: { user: User }) {
    const {functions} = useProfile(); // Get functions from ProfileContext

    return (
        <div className="space-y-6 w-full md:w-[70%]">
            <div className="text-left">
                <h1 className="text-2xl text-base-content">Hello there,</h1>
                <h2 className="text-3xl font-semibold text-base-content">
                    {user.email} 👋
                </h2>
            </div>

            {/* Hero Section - Show only if user has no functions */}
            {functions.length === 0 && (
                <div className="bg-primary text-white rounded-lg p-8 flex items-center justify-between mb-8">
                    <div>
                        <h4 className="text-sm text-neutral">We noticed you&apos;re new..</h4>
                        <h1 className="text-2xl text-success-content font-semibold">
                            Create your first function
                        </h1>
                        <button
                            className="mt-4 btn bg-base-100 hover:bg-base-100 border-none text-base-content rounded-md group"
                        >
                            Get Started
                            <span className="transform transition-transform duration-300 group-hover:translate-x-1 p-1">
                ➔
              </span>
                        </button>
                    </div>
                </div>
            )}

            {/* Function Container Section */}
            <div className="mb-8">
                <div className="bg-base-100 rounded-lg shadow-lg p-6 space-y-4">
                    <h2 className="text-lg text-base-content font-semibold mb-4">
                        Functions
                    </h2>
                    <FunctionContainer/>
                </div>
            </div>

            {/* Next Steps Section */}
            <div className="mb-8">
                <div className="bg-base-100 rounded-lg shadow-lg p-6 space-y-3">
                    <h2 className="text-lg text-base-content font-semibold mb-4">
                        Next steps
                    </h2>
                    <button className="btn w-full justify-start bg-transparent text-left hover:bg-base-300">
                        <PlusSquare className="text-gray-500 mr-4"/>
                        <div>
                            <h3 className="font-semibold text-base-content">Add UI library</h3>
                        </div>
                    </button>
                    <button className="btn w-full justify-start bg-transparent text-left hover:bg-base-300">
                        <GitGraph className="text-gray-500 mr-4"/>
                        <div>
                            <h3 className="font-semibold text-base-content">
                                View interactive project graph
                            </h3>
                        </div>
                    </button>
                    <button className="btn w-full justify-start bg-transparent text-left hover:bg-base-300">
                        <Terminal className="text-gray-500 mr-4"/>
                        <div>
                            <h3 className="font-semibold text-base-content">
                                Run affected commands
                            </h3>
                        </div>
                    </button>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="pt-20 pb-5 text-center text-sm text-gray-500">
                <Link
                    href="https://aritools.xyz"
                    target="_blank"
                    className="hover:bg-base-100 p-2 rounded-lg"
                >
                    Carefully crafted with{" "}
                    <span className="text-pink-500 p-1">♥</span>
                </Link>
            </footer>
        </div>
    );
}