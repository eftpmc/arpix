"use client";

import {useParams, useRouter} from 'next/navigation';
import {useEffect, useRef, useState} from 'react';
import {ArrowLeft, Clipboard, Edit, Save} from 'lucide-react';
import Editor, {OnMount, useMonaco} from '@monaco-editor/react';
import draculaTheme from '@/themes/Dracula.json';
import {useProfile} from '@/contexts/ProfileContext';
import * as monacoEditor from 'monaco-editor';
import toast from 'react-hot-toast';

interface CustomError extends Error {
    message: string;
}

const FunctionEditor = () => {
    const {id} = useParams<{ id: string }>();
    const {functions, updateFunctions} = useProfile();
    const monaco = useMonaco();
    const [code, setCode] = useState<string>('');
    const [functionName, setFunctionName] = useState<string>('');
    const [editorTheme, setEditorTheme] = useState<string>('vs-light');
    const [isThemeLoaded, setIsThemeLoaded] = useState<boolean>(false);
    const [apiEndpoint, setApiEndpoint] = useState<string | null>(null);
    const [isEditingName, setIsEditingName] = useState<boolean>(false);
    const [inputWidth, setInputWidth] = useState<number>(150); // State to track input width
    const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);
    const router = useRouter();
    const hiddenSpanRef = useRef<HTMLSpanElement>(null); // Ref for the hidden span

    useEffect(() => {
        if (monaco) {
            const theme: monacoEditor.editor.IStandaloneThemeData = draculaTheme as monacoEditor.editor.IStandaloneThemeData;
            monaco.editor.defineTheme('dracula', theme);
            setIsThemeLoaded(true);
        }
    }, [monaco]);

    useEffect(() => {
        // Fetch the function data from the context
        const functionData = functions.find((fn) => fn.id === parseInt(id, 10));
        if (functionData) {
            setFunctionName(functionData.name);
            setCode(functionData.code || ''); // Ensure that the code is a non-null string
            adjustInputWidth(functionData.name); // Adjust width based on initial name

            // Set the API endpoint without saving
            const apiUrl = `${window.location.origin}/api/functions?id=${id}`;
            setApiEndpoint(apiUrl);
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

    // Save the function code to the backend
    const saveFunction = async () => {
        try {
            const updatedFunctions = functions.map((fn) =>
                fn.id === parseInt(id, 10) ? {...fn, code} : fn
            );
            updateFunctions(updatedFunctions);

            toast.success('Code saved!');
        } catch (error: unknown) {
            if (isCustomError(error)) {
                toast.error(`Error saving function code: ${error.message}`);
                console.error('Error saving function code:', error.message);
            } else {
                toast.error('Unknown error occurred while saving the function code.');
                console.error('Unknown error occurred while saving the function code.');
            }
        }
    };

    const copyToClipboard = () => {
        if (apiEndpoint) {
            navigator.clipboard.writeText(apiEndpoint);
            toast.success('URL copied!');
        }
    };

    const handleNameClick = () => {
        setIsEditingName(true);
    };

    const handleNameBlur = () => {
        setIsEditingName(false);
        saveFunctionName(); // Save the function name on blur
    };

    // Save the function name to the backend
    const saveFunctionName = async () => {
        try {
            const updatedFunctions = functions.map((fn) =>
                fn.id === parseInt(id, 10) ? {...fn, name: functionName} : fn
            );
            updateFunctions(updatedFunctions);

            toast.success('Name saved!');
        } catch (error: unknown) {
            if (isCustomError(error)) {
                toast.error(`Error saving function name: ${error.message}`);
                console.error('Error saving function name:', error.message);
            } else {
                toast.error('Unknown error occurred while saving the function name.');
                console.error('Unknown error occurred while saving the function name.');
            }
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setFunctionName(newName);
        adjustInputWidth(newName); // Adjust width on name change
    };

    // Adjust the input width based on the hidden span width
    const adjustInputWidth = (text: string) => {
        if (hiddenSpanRef.current) {
            hiddenSpanRef.current.textContent = text;
            const spanWidth = hiddenSpanRef.current.offsetWidth;
            // Set input width with some padding and maximum limit
            setInputWidth(Math.min(spanWidth + 20, 300)); // Adjust max width as needed
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-300 p-6">
            {/* Function Editor Container */}
            <div className="bg-base-100 rounded-lg shadow-lg p-6 w-full max-w-4xl">
                <div className="w-full flex items-center mb-4 space-x-4">
                    <button className="btn btn-sm btn-square" onClick={() => router.push('/')}>
                        <ArrowLeft/>
                    </button>
                    {isEditingName ? (
                        <input
                            type="text"
                            className="input input-bordered input-sm bg-base-200 text-base-content"
                            style={{width: `${inputWidth}px`}} // Dynamic width
                            value={functionName}
                            onChange={handleNameChange}
                            onBlur={handleNameBlur} // Save the function name on blur
                            placeholder="Function Name"
                            autoFocus
                        />
                    ) : (
                        <div className="flex items-center space-x-2 cursor-pointer" onClick={handleNameClick}>
                            <h2 className="text-lg font-semibold text-base-content">{functionName}</h2>
                            <Edit className="w-4 h-4 text-gray-500"/>
                        </div>
                    )}
                    {/* Hidden span to measure input text width */}
                    <span className="absolute top-0 left-0 invisible whitespace-pre" ref={hiddenSpanRef}/>
                </div>
                {isThemeLoaded ? (
                    <Editor
                        height="300px"
                        language="javascript"
                        theme={editorTheme}
                        value={code}
                        onMount={handleEditorDidMount}
                        onChange={(newCode) => setCode(newCode || '')} // Prevent null values
                        options={{
                            automaticLayout: true,
                            minimap: {enabled: false},
                            placeholder: 'Enter your function code here...', // Add a placeholder when the editor is empty
                        }}
                    />
                ) : (
                    <div className="space-y-3">
                        <div className="skeleton h-6 w-3/4 mx-auto"></div>
                        <div className="skeleton h-6 w-1/2 mx-auto"></div>
                        <div className="skeleton h-6 w-1/4 mx-auto"></div>
                    </div>
                )}
                <div className="flex space-x-4 mt-4">
                    <button className="btn btn-ghost btn-sm btn-square text-base-content" onClick={saveFunction}>
                        <Save className="w-6 h-6"/>
                    </button>
                    <div className="relative w-3/5">
                        <input
                            type="text"
                            readOnly
                            className="input input-bordered input-sm w-full bg-base-200 text-base-content pr-10"
                            value={apiEndpoint || 'Loading API URL...'}
                        />
                        <Clipboard
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 cursor-pointer"
                            onClick={copyToClipboard}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FunctionEditor;