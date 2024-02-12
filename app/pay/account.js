'use Client'
import Image from "next/image";
import SvcIcon from "/components/svcIcon";
import Link from 'next/link'

import Footer_pay from "./footer_pay";
import { useState } from "react";
import Modal from "/components/modal.tsx"


import { Provider } from "react-redux";
import store from '/redux/store.js'

import { useDispatch, useSelector } from "react-redux"

import { changeState } from  "/redux/store/contract.js"
import { UchangeState } from "/redux/store/Ucontract.js"








export default function account() {
  let [isModalOpen,setIsModalOpen]=useState(false)
 
  let state= useSelector((state)=>state.contract)
  let Ustate= useSelector((state)=>state.Ucontract)
  let dispatch=useDispatch();
 


    
    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(UchangeState({ field: name, value: value }))
          
        
      };

  return (
    
        <div className="">
            <div className="input_address">
                <div className="input_title ">
                    <div>| </div>
                    <div>임대인의 계좌 정보를 확인해 주세요            </div>
                </div>
                <div className="input_title_sub py-4    ">
                    <div>임대인 계좌 정보가 다르게 입력 되었다면 확인 후 정확한 임대인 계좌 정보를 입력해 주세요</div>
                </div>
                <div className="input_row">
                    <input placeholder="입금하실 은행을 선택하세요" defaultValue={Ustate.bankName} onClick={()=>setIsModalOpen(true)} name="bank"></input>
                    <label>은행</label>
                </div>
                <div className="input_row">
                    <input placeholder="임대인의 계좌번호를 입력해주세요" type="text" value={Ustate.account} onChange={handleChange}  name="account"></input>
                    <label>계좌번호</label>
                </div>

                <div className="input_row">
                
                    <input placeholder="예금주의 이름을 입력하세요" type="text" value={Ustate.accountHolder}  onChange={handleChange} name="accountHolder"></input>
                    
                    <label>예금주</label>
                    
                    
                </div>                

                <div>
                    <ul className="alert_list">
                    {
                       state.lessee != state.accountHolder && (
                            <li className="">* 임대인과 예금주의 명이 다릅니다. ( 계약서상의 임대인 :  {state.lessee})</li>
                        )
                    }
                    </ul>

                </div>
            </div>
  
            
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <img src='/image/pay/banklist.png'></img>
            </Modal>
            
            
            

        </div>
    
  );
}
 