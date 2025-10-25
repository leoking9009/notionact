import React from 'react';

interface SearchBarProps {
  pageId: string;
  setPageId: (id: string) => void;
  onSearch: () => void;
}

export default function SearchBar({ pageId, setPageId, onSearch }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <div className="absolute left-4 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={pageId}
          onChange={(e) => setPageId(e.target.value)}
          placeholder="노션 페이지 ID 또는 URL을 입력하세요..."
          className="w-full pl-12 pr-32 py-4 text-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
        />
        <button
          type="submit"
          className="absolute right-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95 shadow-md"
        >
          검색
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 ml-2">
        예시: https://notion.so/page-title-abc123... 또는 abc123...
      </p>
    </form>
  );
}
