import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NotionAct - Beautiful Notion Page Viewer",
  description: "View your Notion pages in a more intuitive and sophisticated way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased notion-page">
        {children}
      </body>
    </html>
  );
}
