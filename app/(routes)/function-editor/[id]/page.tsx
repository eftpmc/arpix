"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Editor, { useMonaco } from '@monaco-editor/react';
import draculaTheme from '@/themes/Dracula.json';
import {Play} from 'lucide-react'

// Simulating storage for functions in-memory
const functions = [
    { id: 1, name: 'Function 1', code: 'console.log("Function 1");' },
    { id: 2, name: 'Function 2', code: 'console.log("Function 2");' },
];

const FunctionEditor = () => {
    const { id } = useParams();
    const monaco = useMonaco();
    const [code, setCode] = useState('');
    const [functionName, setFunctionName] = useState('');
    const [editorTheme, setEditorTheme] = useState('vs-light');
    const [isThemeLoaded, setIsThemeLoaded] = useState(false);
    const editorRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        if (monaco) {
            // @ts-expect-error
            monaco.editor.defineTheme('dracula', draculaTheme);
            setIsThemeLoaded(true);
        }
    }, [monaco]);

    useEffect(() => {
        // Load the function data based on the ID
        const functionData = functions.find((fn) => fn.id === parseInt(id));
        if (functionData) {
            setFunctionName(functionData.name);
            setCode(functionData.code);
        }
    }, [id]);

    useEffect(() => {
        // Function to update the editor theme based on the document's data-theme attribute
        const updateEditorTheme = () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            setEditorTheme(currentTheme === 'dark' ? 'dracula' : 'vs-light');
        };

        // Initial check and update
        updateEditorTheme();

        // Observe changes to the data-theme attribute
        const observer = new MutationObserver(updateEditorTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme'],
        });

        // Cleanup observer on component unmount
        return () => {
            observer.disconnect();
        };
    }, []);

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
    };

    const runCode = () => {
        try {
            const result = eval(`(function(){ ${code} })()`);
            console.log('Result:', result);
        } catch (error) {
            console.error('Error executing code:', error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-300 p-6">
            {/* Function Editor Container */}
            <div className="bg-base-100 rounded-lg shadow-lg p-6 w-full max-w-4xl">
                <button className="btn btn-sm mb-4" onClick={() => router.push('/')}>
                    <ArrowLeft className="mr-2" />
                    Back to Functions
                </button>
                <h2 className="text-lg font-semibold text-base-content mb-4">{functionName}</h2>
                {isThemeLoaded && code ? (
                    <Editor
                        height="300px"
                        language="javascript"
                        theme={editorTheme} // Use dynamic theme
                        value={code}
                        onMount={handleEditorDidMount}
                        onChange={(newCode) => setCode(newCode)}
                        options={{
                            automaticLayout: true,
                            minimap: { enabled: false }, // Disable minimap for better visibility
                        }}
                    />
                ) : (
                    <div className="text-center">Loading editor...</div>
                )}
                <button className="btn btn-ghost btn-sm btn-square mt-4 text-base-content" onClick={runCode}>
                    <Play className="w-6 h-6"></Play>
                </button>
            </div>
        </div>
    );
};

export default FunctionEditor;