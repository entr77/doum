'use client'
import Image from "next/image";
import SvcIcon from "/components/svcIcon";
import Link from 'next/link'
import { useState } from "react";
 
import {ocrParse} from "/utils/ocr"

 import FormData from 'form-data'
 import { useEffect } from "react";

 import { Provider } from "react-redux";
 import store from '/redux/store.js'
 
import { useDispatch, useSelector } from "react-redux"
import { changeImage } from "/redux/store/contract.js"





export default function contract({setPayStep}) {
 
  let state= useSelector((state)=>state)
  let dispatch=useDispatch();

  
   
  console.log(state.contract.image);
    ocrParse(state.contract.image).then((response) => {
      if (response.success) {
         console.log("주소를 변경합시다=>"+response.result.address);

        
        

      } else {
         console.error(response.error);
      }
    }); 
  return (
    
        <div  >
     
 
             <div className="app_title ">
             임대차 계약서를 분석중입니다.
            </div>
            <div className="app_title_sub py-4  grid place-items-center ">
                <div>월세카드결제 서비스를 이용하기 위해서는</div>
                <div> 임대차 계약서가 필요합니다</div>
            </div>
            <div className="py-10 grid place-items-center">
                
                <img src="/image/pay/contract.png" width='200' height='278' alt="계약서"/>  
            </div>
            <div className="app_comment pb-4">
                
            </div>
        
            <div>
                
                <div className="py-2">
             이미지   {state.contract.image}  
                   
                </div>
                <div className="py-20"></div>
            </div>
        </div>
    
        

    
  )
}
