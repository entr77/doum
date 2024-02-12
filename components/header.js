'use client'

import Link from "next/link"
import Image from "next/image"
import {  usePathname, useRouter } from "next/navigation"

export default function header(){
    
    const pathname = usePathname();
    const router = useRouter();

    let header_type=""
    
    let path=pathname.split("/");

    
    switch (path[1]){
        case "" : header_type=""; break;
        case "pay" : header_type="_wh"; break;
        case "light" : header_type=""; break;
        case "faq" : header_type=""; break;
        case "notice" : header_type=""; break;
    }
    return(
        
    <div className="header   ">
       
        <div className="container relative px-6 py-8">
        <Link href='/'>
            <span>
            <img className="logo" alt="HOME" src={`/image/brand/logo${header_type}.png`}/>
            </span>
            <span  className="px-2">
            <img className="logo_txt pt-5" alt="HOME" src={`/image/brand/logo_txt${header_type}.png`}/>
            </span>
        </Link>
            <span className="icon_menu">
            <img className="logo_txt px-1 py-1" alt="HOME" src={`/image/icon/hamburg${header_type}.png`}/>
            </span>
            </div>
        {/* <div className="grid grid-cols-5  pt-4 pb-2  gap-4  container">
        <div><Link href='/'><img className="navIcon" alt="HOME" src={`/image/icon/footer_tab_1${menu_on[0]}.png`}/></Link></div>
        <div><Link href='/pay'><img className="navIcon"   alt="월세결제" src={`/image/icon/footer_tab_2${menu_on[1]}.png`}/></Link></div>
        <div><Link href='/light'><img className="navIcon"   alt="신호등" src={`/image/icon/footer_tab_3${menu_on[2]}.png`} /></Link></div>
        <div><Link href='/'><img  className="navIcon"  alt="복지몰" src={`/image/icon/footer_tab_4${menu_on[3]}.png`}/></Link></div>
        <div><Link href='/faq'><img className="navIcon"   alt="FAQ" src={`/image/icon/footer_tab_5${menu_on[4]}.png`}/></Link></div>
            
        </div> */}
    </div>
    )
}