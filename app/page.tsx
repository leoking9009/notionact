'use client';

import { useState } from 'react';
import NotionPageViewer from '@/components/NotionPageViewer';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const [pageId, setPageId] = useState<string>('');
  const [currentPageId, setCurrentPageId] = useState<string>('');

  const handleSearch = () => {
    setCurrentPageId(pageId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  NotionAct
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Beautiful Notion Viewer
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <SearchBar
            pageId={pageId}
            setPageId={setPageId}
            onSearch={handleSearch}
          />
        </div>

        {/* Page Viewer */}
        {currentPageId ? (
          <NotionPageViewer pageId={currentPageId} />
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl mb-6">
              <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
              노션 페이지를 입력하세요
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
              위 검색창에 노션 페이지 ID 또는 URL을 입력하면 더욱 세련된 방식으로 페이지를 볼 수 있습니다.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-sm text-blue-800 dark:text-blue-300 font-medium mb-2">
                시작하는 방법:
              </p>
              <ol className="text-sm text-blue-700 dark:text-blue-400 text-left space-y-2">
                <li>1. .env 파일을 생성하고 NOTION_API_KEY를 설정하세요</li>
                <li>2. Notion 통합을 생성하고 페이지에 연결하세요</li>
                <li>3. 페이지 ID를 입력하여 시작하세요</li>
              </ol>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            NotionAct - 노션 페이지를 더욱 아름답게 보여줍니다
          </p>
        </div>
      </footer>
    </div>
  );
}
