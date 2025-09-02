// This file is obsolete and has been replaced by dedicated login and logout routes.
// It can be safely deleted. It is being kept here empty to avoid breaking any
// potential stale imports, but it should not be used.

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    return NextResponse.json({ error: 'This endpoint is deprecated. Use /api/auth/login or /api/auth/logout.' }, { status: 404 });
}
