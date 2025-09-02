
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
    // Instruct the browser to delete the cookie by setting maxAge to 0.
    cookies().set('session', '', { maxAge: 0, path: '/' });
    return NextResponse.json({ status: 'success' }, { status: 200 });
}
