'use client';

import { useEffect, useState } from 'react';
import NotionBlock from './NotionBlock';

interface NotionPageViewerProps {
  pageId: string;
}

export default function NotionPageViewer({ pageId }: NotionPageViewerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageData, setPageData] = useState<any>(null);
  const [blocks, setBlocks] = useState<any[]>([]);

  useEffect(() => {
    if (!pageId) return;

    const fetchPage = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/notion/page?pageId=${encodeURIComponent(pageId)}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch page');
        }

        const data = await response.json();
        setPageData(data.page);
        setBlocks(data.blocks);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching page:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [pageId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">페이지를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-300">
              페이지를 불러올 수 없습니다
            </h3>
            <div className="mt-2 text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
            <div className="mt-4 text-xs text-red-600 dark:text-red-500">
              <p>확인사항:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>NOTION_API_KEY가 올바르게 설정되었는지</li>
                <li>노션 통합이 해당 페이지에 연결되었는지</li>
                <li>페이지 ID가 올바른지</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getPageTitle = () => {
    if (!pageData) return 'Untitled';

    const properties = pageData.properties;
    if (properties?.title?.title?.[0]?.plain_text) {
      return properties.title.title[0].plain_text;
    }
    if (properties?.Name?.title?.[0]?.plain_text) {
      return properties.Name.title[0].plain_text;
    }
    return 'Untitled';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">{getPageTitle()}</h1>
        <div className="flex items-center space-x-4 text-sm opacity-90">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(pageData.created_time).toLocaleDateString('ko-KR')}
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            마지막 수정: {new Date(pageData.last_edited_time).toLocaleDateString('ko-KR')}
          </span>
        </div>
      </div>

      <div className="p-8 sm:p-12 max-w-4xl mx-auto">
        {blocks.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>이 페이지에는 아직 콘텐츠가 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {blocks.map((block) => (
              <NotionBlock key={block.id} block={block} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
