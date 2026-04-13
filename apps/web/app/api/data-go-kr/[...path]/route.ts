import { NextRequest, NextResponse } from 'next/server';

const UPSTREAM_BASE =
  'https://apis.data.go.kr/1543061/abandonmentPublicService_v2';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const serviceKey = process.env.DATA_GO_KR_SERVICE_KEY;
  if (!serviceKey) {
    return NextResponse.json(
      { error: 'DATA_GO_KR_SERVICE_KEY is not configured on the server.' },
      { status: 500 }
    );
  }

  const { path } = await context.params;
  const upstreamPath = path.join('/');

  const params = new URLSearchParams(request.nextUrl.searchParams);
  params.set('serviceKey', serviceKey);
  params.set('_type', 'json');

  const upstreamUrl = `${UPSTREAM_BASE}/${upstreamPath}?${params.toString()}`;

  try {
    const upstream = await fetch(upstreamUrl, {
      headers: { Accept: 'application/json' },
    });
    const body = await upstream.text();
    return new NextResponse(body, {
      status: upstream.status,
      headers: {
        'content-type':
          upstream.headers.get('content-type') ?? 'application/json',
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Upstream fetch failed', message: String(err) },
      { status: 502 }
    );
  }
}
