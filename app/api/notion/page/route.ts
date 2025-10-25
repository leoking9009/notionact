import { NextRequest, NextResponse } from 'next/server';
import { getPageData, getPageBlocks, extractPageId } from '@/lib/notion';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pageIdParam = searchParams.get('pageId');

  if (!pageIdParam) {
    return NextResponse.json(
      { error: 'Page ID is required' },
      { status: 400 }
    );
  }

  try {
    const pageId = extractPageId(pageIdParam);

    const [page, blocks] = await Promise.all([
      getPageData(pageId),
      getPageBlocks(pageId),
    ]);

    return NextResponse.json({
      page,
      blocks,
    });
  } catch (error: any) {
    console.error('Error fetching Notion page:', error);

    let errorMessage = 'Failed to fetch page';
    let statusCode = 500;

    if (error.code === 'object_not_found') {
      errorMessage = '페이지를 찾을 수 없습니다. 페이지 ID를 확인하고 Notion 통합이 연결되어 있는지 확인하세요.';
      statusCode = 404;
    } else if (error.code === 'unauthorized') {
      errorMessage = 'Notion API 키가 올바르지 않습니다. .env 파일을 확인하세요.';
      statusCode = 401;
    } else if (error.code === 'restricted_resource') {
      errorMessage = '이 페이지에 접근할 권한이 없습니다. Notion 통합을 페이지에 공유하세요.';
      statusCode = 403;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}
