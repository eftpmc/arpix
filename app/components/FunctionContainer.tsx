"use client";

import Link from 'next/link';
import { PlusSquare, FileText } from 'lucide-react';
import { useProfile } from '@/contexts/ProfileContext'; // Import the ProfileContext

export default function FunctionContainer() {
    const { functions, updateFunctions } = useProfile(); // Use profile context

    const addFunction = () => {
        const newFunction = {
            id: Date.now(),
            name: `Function ${functions.length + 1}`,
            code: `console.log("Function ${functions.length + 1}");`
        };
        updateFunctions([...functions, newFunction]); // Update functions in context
    };

    return (
        <div className="space-y-3 w-full">
            {functions.map((fn) => (
                <div key={fn.id} className="">
                    <Link href={`/function-editor/${fn.id}`}>
                        <button className="btn w-full justify-start bg-transparent text-left hover:bg-base-300">
                            <FileText className="text-gray-500 mr-4" />
                            <h3 className="text-sm font-semibold text-base-content">{fn.name}</h3>
                        </button>
                    </Link>
                </div>
            ))}

            {/* Add Function Button */}
            <button className="btn w-full justify-start bg-transparent text-left hover:bg-base-300 mt-4" onClick={addFunction}>
                <PlusSquare className="text-gray-500 mr-2" />
                <span>Add Function</span>
            </button>
        </div>
    );
}