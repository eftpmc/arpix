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
        <div className="space-y-6 w-full md:w-[70%]">
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
                    <button className="mt-4 btn bg-base-100 hover:bg-base-300 text-base-content">What’s next?</button>
                </div>
            </div>

            {/* Learning Materials Section */}
            <div className="mb-8">
                <div className="bg-base-100 rounded-lg shadow-lg p-6 space-y-4">
                    <h2 className="text-lg text-base-content font-semibold mb-4">Learning materials</h2>
                    {/* Documentation */}
                    <button className="btn btn-lg w-full justify-start bg-transparent text-left hover:bg-base-300">
                        <FileText className="text-gray-500 mr-4" />
                        <div>
                            <h3 className="text-sm font-semibold text-base-content">Documentation</h3>
                            <p className="text-gray-400 text-xs">Everything is in there</p>
                        </div>
                    </button>
                    {/* Blog */}
                    <button className="btn btn-lg w-full justify-start bg-transparent text-left hover:bg-base-300">
                        <BookOpen className="text-gray-500 mr-4" />
                        <div>
                            <h3 className="text-sm font-semibold text-base-content">Blog</h3>
                            <p className="text-gray-400 text-xs">Changelog, features & events</p>
                        </div>
                    </button>
                    {/* YouTube Channel */}
                    <button className="btn btn-lg w-full justify-start bg-transparent text-left hover:bg-base-300">
                        <Tv className="text-gray-500 mr-4" />
                        <div>
                            <h3 className="text-sm font-semibold text-base-content">YouTube channel</h3>
                            <p className="text-gray-400 text-xs">Nx Show, talks & tutorials</p>
                        </div>
                    </button>
                    {/* Interactive Tutorials */}
                    <button className="btn btn-lg w-full justify-start bg-transparent text-left hover:bg-base-300">
                        <GraduationCap className="text-gray-500 mr-4" />
                        <div>
                            <h3 className="text-sm font-semibold text-base-content">Interactive tutorials</h3>
                            <p className="text-gray-400 text-xs">Create an app, step-by-step</p>
                        </div>
                    </button>
                    {/* Video Courses */}
                    <button className="btn btn-lg w-full justify-start bg-transparent text-left hover:bg-base-300">
                        <Video className="text-gray-500 mr-4" />
                        <div>
                            <h3 className="text-sm font-semibold text-base-content">Video courses</h3>
                            <p className="text-gray-400 text-xs">Nx custom courses</p>
                        </div>
                    </button>
                </div>
            </div>

            {/* Next Steps Section */}
            <div className="mb-8">
                <div className="bg-base-100 rounded-lg shadow-lg p-6 space-y-3">
                    <h2 className="text-lg text-base-content font-semibold mb-4">Next steps</h2>
                    {/* Add UI Library */}
                    <button className="btn w-full justify-start bg-transparent text-left hover:bg-base-300">
                        <PlusSquare className="text-gray-500 mr-4" />
                        <div>
                            <h3 className="font-semibold text-base-content">Add UI library</h3>
                        </div>
                    </button>
                    {/* View Project Graph */}
                    <button className="btn w-full justify-start bg-transparent text-left hover:bg-base-300">
                        <GitGraph className="text-gray-500 mr-4" />
                        <div>
                            <h3 className="font-semibold text-base-content">View interactive project graph</h3>
                        </div>
                    </button>
                    {/* Run Affected Commands */}
                    <button className="btn w-full justify-start bg-transparent text-left hover:bg-base-300">
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
