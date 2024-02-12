'use Client'
import Image from "next/image";
import SvcIcon from "/components/svcIcon";
import Link from 'next/link'


export default function footer_pay(setPayStep={setPayStep},payStep={payStep},msg){
    return(
        <div className="footer_pay ">
            <div className="title ">
                {msg}
            </div>
                <div className="btn_area">
                    
                    <div className="">
                        <button className="btn_cta_prev" onClick={()=>setPayStep(payStep-1)}>  이전 </button>
                    </div>
                    <div className="">
                        <button className="btn_cta_next" onClick={()=>setPayStep(payStep+1)}>다음</button>
                    </div>
                        
                
                </div>
        </div>
    )
}            