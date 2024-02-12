'use client'

import Link from "next/link"
import Image from "next/image"
import {  usePathname, useRouter } from "next/navigation"

export default function footer(){
    
    const pathname = usePathname();
    const router = useRouter();

    let menu_on=["","","","",""]
    
 
    
    switch (pathname){
        case "/" : menu_on[0]="_on"; break;
        case "/pay" : menu_on[1]="_on"; break;
        case "/light" : menu_on[2]="_on"; break;
        case "/insurance" : menu_on[2]="_on"; break;
        case "/faq" : menu_on[3]="_on"; break;
        case "/notice" : menu_on[4]="_on"; break;
    }
    return(
    <div className="footer ">
        
        <div className="grid grid-cols-5  pt-4 pb-2  gap-4  container">
        <div><Link href='/'><img className="navIcon" alt="HOME" src={`/image/icon/footer_tab_1${menu_on[0]}.png`}/></Link></div>
        <div><Link href='/pay'><img className="navIcon"   alt="월세결제" src={`/image/icon/footer_tab_2${menu_on[1]}.png`}/></Link></div>
        <div><Link href='/light'><img className="navIcon"   alt="신호등" src={`/image/icon/footer_tab_3${menu_on[2]}.png`} /></Link></div>
        <div><Link href='/pay/my'><img  className="navIcon"  alt="복지몰" src={`/image/icon/footer_tab_4${menu_on[3]}.png`}/></Link></div>
        <div><Link href='/pay/parse'><img className="navIcon"   alt="FAQ" src={`/image/icon/footer_tab_5${menu_on[4]}.png`}/></Link></div>
            
        </div>
    </div>
    )
}