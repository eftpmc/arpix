import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export async function POST(req: NextRequest): Promise<NextResponse> {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id'); // Get the 'id' from URL query parameters

    if (!id) {
        return new NextResponse(
            JSON.stringify({ error: 'Function id is required' }),
            { status: 400 }
        );
    }

    const userId = req.headers.get('x-user-id'); // Retrieve user ID from header
    if (!userId) {
        return new NextResponse(
            JSON.stringify({ error: 'User ID is required in headers' }),
            { status: 400 }
        );
    }

    if (req.method !== 'POST') {
        return new NextResponse(
            JSON.stringify({ error: 'Method not allowed' }),
            { status: 405 }
        );
    }

    // Fetch the function data from the Supabase database
    const { data, error } = await supabase
        .from('profiles')
        .select('functions')
        .eq('id', userId)
        .single();

    if (error || !data) {
        return new NextResponse(
            JSON.stringify({ error: 'User or functions not found' }),
            { status: 404 }
        );
    }

    // Find the function by ID
    const functions = data.functions || [];
    const functionData = functions.find((fn: { id: number }) => fn.id === parseInt(id, 10));

    if (!functionData) {
        return new NextResponse(
            JSON.stringify({ error: 'Function not found' }),
            { status: 404 }
        );
    }

    // Parse the request body to pass as context data
    let requestData = {};
    try {
        requestData = await req.json();
    } catch {
        return new NextResponse(
            JSON.stringify({ error: 'Invalid JSON body' }),
            { status: 400 }
        );
    }

    try {
        // Create a new function that accepts a context parameter and execute it with requestData
        const userFunction = new Function('context', `return (async () => { ${functionData.code} })(context);`);
        const result = await userFunction(requestData); // Pass requestData directly as context

        return new NextResponse(JSON.stringify({ result }), { status: 200 });
    } catch {
        return new NextResponse(
            JSON.stringify({ error: `Error executing function` }),
            { status: 500 }
        );
    }
}