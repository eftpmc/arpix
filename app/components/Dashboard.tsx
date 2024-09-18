import { User } from "@supabase/supabase-js"; // Assuming you're using Supabase for user
import {
    FileText,
    BookOpen,
    GraduationCap,
    Video,
    PlusSquare,
    Terminal,
    GitGraph,
    Tv,
} from "lucide-react";

export default function Dashboard({ user }: { user: User }) {
    return (
        <div className="p-4 space-y-6 w-full md:w-[80%]">
            <div className="text-left">
                <h1 className="text-2xl text-base-content">Hello there,</h1>
                <h2 className="text-3xl font-semibold text-base-content">
                    {user.email} 👋
                </h2>
            </div>

            {/* Hero Section */}
            <div className="bg-blue-900 text-white rounded-lg p-8 flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold">You’re up and running</h1>
                    <button className="mt-4 btn btn-light">What’s next?</button>
                </div>
                <div>
                    <img
                        src="https://nx.dev/assets/images/nx-logo.svg" // Placeholder image for Nx logo
                        alt="Nx logo"
                        className="w-24"
                    />
                </div>
            </div>

            {/* Learning Materials Section */}
            <div className="mb-8">
                <div className="bg-white rounded-lg shadow-lg p-6 space-y-3">
                    <h2 className="text-lg text-base-content font-semibold mb-4">Learning materials</h2>
                    {/* Documentation */}
                    <button className="btn w-full justify-start bg-transparent text-left hover:bg-gray-100">
                        <FileText className="text-gray-500 mr-4" />
                        <div>
                            <h3 className="font-semibold text-base-content">Documentation</h3>
                            <p className="text-gray-400 text-sm">Everything is in there</p>
                        </div>
                    </button>
                    {/* Blog */}
                    <button className="btn w-full justify-start bg-transparent text-left hover:bg-gray-100">
                        <BookOpen className="text-gray-500 mr-4" />
                        <div>
                            <h3 className="font-semibold text-base-content">Blog</h3>
                            <p className="text-gray-400 text-sm">Changelog, features & events</p>
                        </div>
                    </button>
                    {/* YouTube Channel */}
                    <button className="btn w-full justify-start bg-transparent text-left hover:bg-gray-100">
                        <Tv className="text-gray-500 mr-4" />
                        <div>
                            <h3 className="font-semibold text-base-content">YouTube channel</h3>
                            <p className="text-gray-400 text-sm">Nx Show, talks & tutorials</p>
                        </div>
                    </button>
                    {/* Interactive Tutorials */}
                    <button className="btn w-full justify-start bg-transparent text-left hover:bg-gray-100">
                        <GraduationCap className="text-gray-500 mr-4" />
                        <div>
                            <h3 className="font-semibold text-base-content">Interactive tutorials</h3>
                            <p className="text-gray-400 text-sm">Create an app, step-by-step</p>
                        </div>
                    </button>
                    {/* Video Courses */}
                    <button className="btn w-full justify-start bg-transparent text-left hover:bg-gray-100">
                        <Video className="text-gray-500 mr-4" />
                        <div>
                            <h3 className="font-semibold text-base-content">Video courses</h3>
                            <p className="text-gray-400 text-sm">Nx custom courses</p>
                        </div>
                    </button>
                </div>
            </div>

            {/* Next Steps Section */}
            <div className="mb-8">
                <div className="bg-white rounded-lg shadow-lg p-6 space-y-3">
                    <h2 className="text-lg text-base-content font-semibold mb-4">Next steps</h2>
                    {/* Add UI Library */}
                    <button className="btn w-full justify-start bg-transparent text-left hover:bg-gray-100">
                        <PlusSquare className="text-gray-500 mr-4" />
                        <div>
                            <h3 className="font-semibold text-base-content">Add UI library</h3>
                        </div>
                    </button>
                    {/* View Project Graph */}
                    <button className="btn w-full justify-start bg-transparent text-left hover:bg-gray-100">
                        <GitGraph className="text-gray-500 mr-4" />
                        <div>
                            <h3 className="font-semibold text-base-content">View interactive project graph</h3>
                        </div>
                    </button>
                    {/* Run Affected Commands */}
                    <button className="btn w-full justify-start bg-transparent text-left hover:bg-gray-100">
                        <Terminal className="text-gray-500 mr-4" />
                        <div>
                            <h3 className="font-semibold text-base-content">Run affected commands</h3>
                        </div>
                    </button>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="text-center text-sm text-gray-500">
                Carefully crafted with <span className="text-pink-500">♥</span>
            </footer>
        </div>
    );
}
