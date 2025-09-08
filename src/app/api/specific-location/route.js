import { NextResponse } from 'next/server';


export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const ipAddress = searchParams.get('ip');

    try {
        const response = await fetch(`https://freeipapi.com/api/json/${ipAddress}`);
        if(!response.ok) throw new Error('Failed to fetch IP')
        const data = await response.json();

        return NextResponse.json({country: data.countryCode});
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch IP' }, { status: 500 });
    }
}       