'use Client'
import Image from "next/image";
import SvcIcon from "/components/svcIcon";
import Link from 'next/link'

import { Provider } from "react-redux";
import store from '/redux/store.js'

import { useDispatch, useSelector } from "react-redux"
import { changeState } from  "/redux/store/contract.js"
import { UchangeState } from "/redux/store/Ucontract.js"




export default function confirm({setPayStep}) {

    let state= useSelector((state)=>state.contract)
    let Ustate= useSelector((state)=>state.Ucontract)
    let dispatch=useDispatch();
   
  
  
      
      const handleChange = (e) => {
          const { name, value } = e.target;
          dispatch(UchangeState({ field: name, value: value }))
            
          
        };
    
   return (
    
        <div className="">
            <div className="app_title py-6">
            입력된 정보를 확인해 주세요
            </div>
            <div className="confirm_card">
            <div className="contents">
                    
                        <div className="title">임대료 정보</div>
                        <div className="grid grid-cols-3 gap-2 w-full"> 

                        <div className="">주소</div>
                        <div className="col-span-2 text-right">{Ustate.address} </div>

                        <div className="">상세 주소</div>
                        <div className="col-span-2 text-right">{Ustate.address_sub}</div>

                        <div className="">임대인 이름</div>
                        <div className="col-span-2 text-right">{Ustate.lessee}</div>

                        <div className="">입금계좌</div>
                        <div className="col-span-2 text-right">{Ustate.account}</div>

                        <div className="">입금자명(임차인)</div>
                        <div className="col-span-2 text-right">{Ustate.accountHolder}</div>

                        <div className="">송금자명(임대인)</div>
                        <div className="col-span-2 text-right">{Ustate.sender}</div>

                        <div className="">임대료(송금액)</div>
                        <div className="col-span-2 text-right">{Ustate.monthlyRent}원</div>
                        
                        <div className="">송금방식</div>
                        <div className="col-span-2 text-right">즉시송금</div>

                        </div>
                    
                </div>
                <div className="pay">
                    <div className="title">결제 예정 내역</div>
                    
                    <div className="grid grid-cols-5 gap-2 w-full"> 

                        <div className="col-span-2">월세 플랫폼 이용료</div>
                        <div className="col-span-3 text-right">42,900원</div>

                        <div className="col-span-2">총 결제금액</div>
                        <div className="col-span-3 text-right">1,042,900원</div>

                    </div>

                </div>

            </div>
              
        </div>
    
        

    
  )
}
