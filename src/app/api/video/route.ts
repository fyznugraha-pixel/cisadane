import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  const videoUrl = "https://tu3nqofhiakzxz6q.private.blob.vercel-storage.com/CISADANE%202026-LANDSCAPE-1920%20X%201080-mp4_.mp4";
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (!token) {
    return new NextResponse('Server configuration error: Missing blob token', { status: 500 });
  }

  try {
    // We forward the Range header if the browser requests it (important for video streaming)
    const rangeHeader = request.headers.get('range');
    const headers = new Headers({
      Authorization: `Bearer ${token}`
    });

    if (rangeHeader) {
      headers.set('Range', rangeHeader);
    }

    const response = await fetch(videoUrl, { headers });

    if (!response.ok) {
      return new NextResponse(`Failed to fetch video: ${response.statusText}`, { status: response.status });
    }

    // Create response headers, copying important headers from the upstream response
    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', response.headers.get('Content-Type') || 'video/mp4');
    responseHeaders.set('Cache-Control', 'public, max-age=86400');
    
    if (response.headers.has('Content-Length')) {
      responseHeaders.set('Content-Length', response.headers.get('Content-Length')!);
    }
    
    if (response.headers.has('Content-Range')) {
      responseHeaders.set('Content-Range', response.headers.get('Content-Range')!);
    }
    
    if (response.headers.has('Accept-Ranges')) {
      responseHeaders.set('Accept-Ranges', response.headers.get('Accept-Ranges')!);
    }

    return new NextResponse(response.body, {
      status: response.status, // Preserve 206 Partial Content status if applicable
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Error proxying video:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
