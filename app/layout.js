import { Inter } from "next/font/google"
import "./globals.css"
import "./csspin-bubble.css"
import Footer from "/components/footer";

import Header from "/components/header";
import Modal from "/components/modal.tsx";
import React from "react";




const inter = Inter({ subsets: ["latin"] });
 
import { useRouter } from "next/navigation"


export const metadata = {
  title: "도움페이",
  description: "오직 임차인을 위한 임차인 필수 플랫폼",
};

export default function RootLayout({ children }) {
  
  children: React.ReactNode

  return (
    <html lang="kr">
        <head>
        <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" rel="stylesheet" />
        <link rel="apple-touch-icon" sizes="57x57" href="/image/favicon/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/image/favicon/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/image/favicon/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/image/favicon/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/image/favicon/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/image/favicon/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/image/favicon/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/image/favicon/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/image/favicon/apple-icon-180x180.png" />
        
        <link rel="icon" type="image/png" sizes="32x32" href="/image/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/image/favicon/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/image/favicon/favicon-16x16.png" />

<meta name="theme-color" content="#ffffff" />


        </head>
      <body className={inter.className}>
        <Header>
      

        </Header>
        <main>{children}
        </main>
          
          
          
        <Footer></Footer>

        <div id="global-modal"></div>

        </body>
    </html>
  );
}
