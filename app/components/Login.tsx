import SignInButton from "./SignInButton"; // Import the SignInButton component

export default function Login() {
    return (
        <div className="flex flex-col gap-4 items-center text-center">
            <h1 className="text-5xl font-bold text-base-content">AI, Visualized</h1>
            <h2 className="text-2xl text-gray-500">
                Integrate AI into your application smoothly, through visualization.
            </h2>
            <SignInButton /> {/* Render the SignInButton component */}
        </div>
    );
}
