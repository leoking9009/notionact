# NotionAct - Beautiful Notion Page Viewer

노션 페이지를 더욱 직관적이고 세련된 방식으로 보여주는 웹 애플리케이션입니다.

![NotionAct](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)

## ✨ 주요 기능

- 🎨 **세련된 UI**: 노션 페이지를 더욱 아름답고 읽기 쉽게 표시
- 🌓 **다크 모드**: 자동 다크 모드 지원
- 📱 **반응형 디자인**: 모든 디바이스에서 완벽하게 작동
- ⚡ **빠른 로딩**: Next.js 14와 최적화된 성능
- 🎯 **직관적인 인터페이스**: 간단한 검색으로 바로 페이지 확인

## 🚀 시작하기

### 사전 요구사항

- Node.js 18.0 이상
- Notion 계정 및 API 키

### 설치

1. **리포지토리 클론**

```bash
git clone https://github.com/leoking9009/notionact.git
cd notionact
```

2. **의존성 설치**

```bash
npm install
```

3. **환경 변수 설정**

`.env.example` 파일을 `.env.local`로 복사하고 설정합니다:

```bash
cp .env.example .env.local
```

`.env.local` 파일을 열고 다음 값을 설정하세요:

```env
NOTION_API_KEY=your_notion_integration_token_here
NOTION_PAGE_ID=your_default_page_id_here
```

### Notion 통합 설정

1. **Notion 통합 생성**
   - [Notion Integrations](https://www.notion.so/my-integrations) 페이지로 이동
   - "New integration" 버튼 클릭
   - 통합 이름 입력 (예: "NotionAct")
   - "Submit" 클릭하여 통합 생성
   - "Internal Integration Token" 복사 → `.env.local`의 `NOTION_API_KEY`에 붙여넣기

2. **페이지에 통합 연결**
   - 보고 싶은 Notion 페이지 열기
   - 우측 상단 "..." 메뉴 클릭
   - "Add connections" 선택
   - 생성한 통합 선택

3. **페이지 ID 가져오기**
   - Notion 페이지 URL에서 ID 복사
   - 예: `https://notion.so/My-Page-abc123def456...`
   - `abc123def456...` 부분이 페이지 ID

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📖 사용 방법

1. **페이지 검색**
   - 검색창에 Notion 페이지 URL 또는 페이지 ID 입력
   - "검색" 버튼 클릭

2. **페이지 보기**
   - 페이지가 세련된 형태로 렌더링됩니다
   - 다양한 Notion 블록 타입 지원:
     - 제목 (H1, H2, H3)
     - 단락
     - 리스트 (순서 있음/없음)
     - 체크박스
     - 코드 블록
     - 인용구
     - 콜아웃
     - 이미지
     - 구분선

## 🏗️ 프로젝트 구조

```
notionact/
├── app/
│   ├── api/
│   │   └── notion/
│   │       └── page/
│   │           └── route.ts      # Notion API 라우트
│   ├── globals.css               # 전역 스타일
│   ├── layout.tsx                # 루트 레이아웃
│   └── page.tsx                  # 메인 페이지
├── components/
│   ├── NotionBlock.tsx           # Notion 블록 렌더러
│   ├── NotionPageViewer.tsx      # 페이지 뷰어
│   └── SearchBar.tsx             # 검색 바
├── lib/
│   └── notion.ts                 # Notion API 유틸리티
├── .env.example                  # 환경 변수 예시
├── next.config.js                # Next.js 설정
├── tailwind.config.js            # Tailwind CSS 설정
└── package.json
```

## 🎨 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **API**: Notion API (@notionhq/client)
- **마크다운**: notion-to-md

## 🔧 설정

### 커스텀 도메인 설정

`next.config.js` 파일에서 이미지 도메인을 추가로 설정할 수 있습니다:

```javascript
module.exports = {
  images: {
    domains: [
      'www.notion.so',
      'images.unsplash.com',
      // 여기에 추가 도메인 입력
    ],
  },
}
```

### 스타일 커스터마이징

`app/globals.css`와 `tailwind.config.js`에서 색상, 폰트, 간격 등을 커스터마이징할 수 있습니다.

## 🚀 배포

### Vercel

```bash
npm run build
```

Vercel에 배포하려면:

1. GitHub 리포지토리에 푸시
2. [Vercel](https://vercel.com) 계정으로 로그인
3. "Import Project" 선택
4. 환경 변수 설정 (NOTION_API_KEY)
5. 배포!

## 📝 라이선스

MIT License

## 🤝 기여

기여는 언제나 환영합니다! Pull Request를 보내주세요.

## 📧 문의

문제가 있거나 제안사항이 있으시면 Issue를 열어주세요.

---

**NotionAct**로 노션 페이지를 더욱 아름답게 즐기세요! 🎉
