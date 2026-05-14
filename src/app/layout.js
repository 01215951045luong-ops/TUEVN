// src/app/layout.js
import "./global.css"; 

export const metadata = {
  title: "TUEVN - 學越南語",
  description: "越南語初學者學習網站",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <head>
        <link 
          href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" 
          rel="stylesheet" 
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}