'use client'
import Image from "next/image"
import Link from 'next/link'

import { useEffect, useState } from "react"

 
import './style.css'
import MycardSlide from "/components/mycardSlide"

import styled from "styled-components";
export default function my() {
  

 
     


  return (
    <div>

      <div className="content_app_my  container  py-6 px-6">
            
        <div className="py-3">
          <img src="/image/pay/my/ttl_recent.png"></img>
        </div>
        <div>

        <div className="history_card grid grid-rows-2 grid-cols-5  ">
              <div className="row-span-2 py-3 px-2">
              <img src="/image/pay/bank/bank_kb.png"></img>
              </div>
              <div className="col-span-2 title pl-3 pt-3">
                우리집
              </div>
              <div className="col-span-2 title text-right pr-4 pt-3">
                1,000,000원
              </div>
              <div className="col-span-2  pl-3 py-3">
                KB 카드 **** 6042
              </div>
              <div className="col-span-2 text-right  py-3 pr-4">
                23/12/12
              </div>

          </div>

          <div className="history_card grid grid-rows-2 grid-cols-5  ">
              <div className="row-span-2 py-3 px-2">
              <img src="/image/pay/bank/bank_sh.png"></img>
              </div>
              <div className="col-span-2 title pl-3 pt-3">
                사무실
              </div>
              <div className="col-span-2 title text-right pr-4 pt-3">
                3,200,000원
              </div>
              <div className="col-span-2  pl-3 py-3">
                신한 카드 **** 6042
              </div>
              <div className="col-span-2 text-right  py-3 pr-4">
                23/12/12
              </div>

          </div>

          <div className="history_card grid grid-rows-2 grid-cols-5  ">
              <div className="row-span-2 py-3 px-2">
              <img src="/image/pay/bank/bank_hn.png"></img>
              </div>
              <div className="col-span-2 title pl-3 pt-3">
                물류창고
              </div>
              <div className="col-span-2 title text-right pr-4 pt-3">
                2,400,000원
              </div>
              <div className="col-span-2  pl-3 py-3">
                하나 카드 **** 6042
              </div>
              <div className="col-span-2 text-right  py-3 pr-4">
                23/12/12
              </div>

          </div>
                        
        </div>
         

       </div>

       <div className="top container">
          <div className="relative "><img src="/image/pay/my/bg_top.png" width='100%' height='278' alt="MY"/> 
              <div className="  contents_in_bg ">
                  <div className="px-6 py-7">
                      <img src="/image/pay/my/ttl_quick_toss.png"></img>
                  </div>
                  <div className=" container  ">
                  <MycardSlide></MycardSlide>
                      
                  </div>
              </div>
              
          </div>
        
      </div>
    </div>
  );
}
