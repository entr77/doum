'use client';

import Image from "next/image";
import SvcIcon from "/components/svcIcon";
import Link from 'next/link'
import { useState } from "react";



import Contract from "./parse";

import { useEffect } from "react";
import { useRouter } from 'next/navigation'

 

import Modal from "/components/modal.tsx"
import {ocrParse} from "/utils/ocr"
 


import { Provider } from "react-redux";
import store from '/redux/store.js'


export default function pay() {
  
  
  let router = useRouter()

  let [payStep,setPayStep]=useState(0);

 



  let [isModalOpen,setIsModalOpen]=useState(false)

  let banner=0;
  let msg=["",
    "입력된 주소가 다르면 어떻게 하죠?",
    "임대인 계좌 정보가 다르면 어떻게하죠?",
    "송금한도와 송금방식에 대해 궁금해요",
    "송금 및 결제 정보를 확인하셨나요?"]
 
    let [fade, setFade] = useState('')
    
    
 
    
  


  

  return (
    <Provider store={store}>

    <div>
     
    

 
    
        
      <div className="top container">
                    <div><img src="/image/pay/bg_top.png" width='100%'  height='278' alt="계약서"/>  </div>
      </div>
 
            
      <div className="content_app  container  py-14 px-6"> 
      {
        payStep>0 && <div className="btn_arrow_left"><img src="/image/icon/btn_arrow_left.png"  onClick={()=>       
          {
         
          setPayStep(payStep-1) 
        }}   width="10px"></img></div>
      }
          
      
            {  payStep ==0 && <Contract     setPayStep={setPayStep}  ></Contract>}
            {  payStep ==1 && <Address     contractInfo={contractInfo}   ></Address>}
            {  payStep ==2 && <Account    ></Account>}
            {  payStep ==3 && <Toss ></Toss>}
            {  payStep ==4 && <Confirm ></Confirm>}
            
      </div>
            
            {  (payStep >0&& payStep<4) &&
                
                    <div className="footer_pay ">
                        <div className="container">
                        <div className="title py-3">
                            {msg[payStep]}
                        </div>
                            <div className="btn_area py-2 px-2">
                                    <button className="btn_cta_prev" onClick={()=>setPayStep(payStep-1)} >  이전 </button>
                                    <button className="btn_cta_next" onClick={()=>setPayStep(payStep+1)}>다음</button>
                            </div>
                        </div>
                    </div>
            }
                        {  (payStep ==4) &&
                
                <div className="footer_pay ">
                    <div className="container">
                    <div className="title py-3">
                        {msg[payStep]}
                    </div>
                        <div className="btn_area py-2 px-2">
                                <button className="btn_cta_prev" onClick={()=>setPayStep(payStep-1)}>  이전 </button>
                                <button className="btn_cta_next" onClick={()=>setIsModalOpen(true)}>완료</button>
                        </div>
                    </div>
                </div>
                        
                
        }

            
                            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                              <div className="alert ">
                                <div className="title pb-9 text-center w-full">등록이 완료되었습니다.</div>
                                <div className="comment pb-9 text-center w-full  px-4">
                                  <div>임대차 계약서와 임대료 정보 등록이</div>
                                  <div className="" > 모두 완료되었습니다.  지금 결제 및 송금을 진행하시겠습니까?</div>
                                </div>
                                <div>

                                </div>
                                <div className="grid grid-cols-2 border-t-1	">
                                  <div className="w-full text-center alert_btn  py-5 px-5  ">나중에 결제</div>
                                  <div className="w-full text-center alert_btn  py-5 px-5 ">결제 시작</div>
                                </div>
                                
                              </div>
                            </Modal>         
          
              
    </div>
    </Provider>
  )
}



