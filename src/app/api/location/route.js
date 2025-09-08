import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const headersList = headers();
    // Get IP directly from request headers
    const userIp = 
        request.headers.get('x-user-ip') ||
        request.headers.get('cf-connecting-ip') || 
        request.headers.get('x-real-ip') || 
        request.headers.get('x-forwarded-for') || 
        headersList.get('x-user-ip') ||
        headersList.get('cf-connecting-ip') || 
        headersList.get('x-real-ip') || 
        headersList.get('x-forwarded-for') || 
        request.ip;
    
    const response = NextResponse.json({ ip: userIp });
    // Expose the x-user-ip header
    response.headers.set('Access-Control-Expose-Headers', 'x-user-ip');
    response.headers.set('x-user-ip', userIp);
    
    return response;
}