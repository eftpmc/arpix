"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Save, Clipboard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Editor, { useMonaco, OnMount } from '@monaco-editor/react';
import draculaTheme from '@/themes/Dracula.json';
import { useProfile } from '@/contexts/ProfileContext';
import * as monacoEditor from 'monaco-editor';

interface CustomError extends Error {
    message: string;
}

const FunctionEditor = () => {
    const { id } = useParams<{ id: string }>();
    const { user, functions, updateFunctions } = useProfile();
    const monaco = useMonaco();
    const [code, setCode] = useState<string>('');
    const [functionName, setFunctionName] = useState<string>('');
    const [editorTheme, setEditorTheme] = useState<string>('vs-light');
    const [isThemeLoaded, setIsThemeLoaded] = useState<boolean>(false);
    const [apiEndpoint, setApiEndpoint] = useState<string | null>(null);
    const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (monaco) {
            const theme: monacoEditor.editor.IStandaloneThemeData = draculaTheme as monacoEditor.editor.IStandaloneThemeData;
            monaco.editor.defineTheme('dracula', theme);
            setIsThemeLoaded(true);
        }
    }, [monaco]);

    useEffect(() => {
        const functionData = functions.find((fn) => fn.id === parseInt(id, 10));
        if (functionData) {
            setFunctionName(functionData.name);
            setCode(functionData.code);
        }
    }, [id, functions]);

    useEffect(() => {
        const updateEditorTheme = () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            setEditorTheme(currentTheme === 'dark' ? 'dracula' : 'vs-light');
        };

        updateEditorTheme();

        const observer = new MutationObserver(updateEditorTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme'],
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleEditorDidMount: OnMount = (editor) => {
        editorRef.current = editor;
    };

    const isCustomError = (error: unknown): error is CustomError => {
        return typeof error === 'object' && error !== null && 'message' in error;
    };

    const runCode = () => {
        try {
            const result = eval(`(async () => { ${code} })()`);
            console.log('Result:', result);
        } catch (error: unknown) {
            if (isCustomError(error)) {
                console.error('Error executing code:', error.message);
            } else {
                console.error('Unknown error occurred');
            }
        }
    };

    // Function to save the function code to the backend and generate API URL
    const saveFunction = async () => {
        try {
            const updatedFunctions = functions.map((fn) =>
                fn.id === parseInt(id, 10) ? { ...fn, code } : fn
            );
            updateFunctions(updatedFunctions);

            // Generate the API URL
            if (user) {
                const apiUrl = `${window.location.origin}/api/functions?id=${id}`;
                setApiEndpoint(apiUrl);
                console.log('Function saved and API URL generated:', apiUrl);
            }
        } catch (error: unknown) {
            if (isCustomError(error)) {
                console.error('Error saving function:', error.message);
            } else {
                console.error('Unknown error occurred while saving the function.');
            }
        }
    };

    const copyToClipboard = () => {
        if (apiEndpoint) {
            navigator.clipboard.writeText(apiEndpoint);
            alert('API URL copied to clipboard!');
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
                        theme={editorTheme}
                        value={code}
                        onMount={handleEditorDidMount}
                        onChange={(newCode) => setCode(newCode || '')}
                        options={{
                            automaticLayout: true,
                            minimap: { enabled: false },
                        }}
                    />
                ) : (
                    <div className="text-center">Loading editor...</div>
                )}
                <div className="flex space-x-4 mt-4">
                    <button className="btn btn-ghost btn-sm btn-square text-base-content" onClick={runCode}>
                        <Play className="w-6 h-6" />
                    </button>
                    <button className="btn btn-ghost btn-sm btn-square text-base-content" onClick={saveFunction}>
                        <Save className="w-6 h-6" />
                    </button>
                    <div className="relative w-3/5">
                        <input
                            type="text"
                            readOnly
                            className="input input-bordered input-sm w-full bg-base-200 text-base-content pr-10"
                            value={apiEndpoint || 'Save to generate API URL'}
                        />
                        {apiEndpoint && (
                            <Clipboard
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 cursor-pointer"
                                onClick={copyToClipboard}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FunctionEditor;