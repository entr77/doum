'use Client'
import Image from "next/image";
import SvcIcon from "/components/svcIcon";
import Link from 'next/link'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from "react";
import Modal from "/components/modal.tsx"
import Footer_pay from "./footer_pay";




import { Provider } from "react-redux";
import store from '/redux/store.js'

import { useDispatch, useSelector } from "react-redux"
import { changeState } from  "/redux/store/contract.js"
import { UchangeState } from "/redux/store/Ucontract.js"




 

export default function account() {

 
 
    let state= useSelector((state)=>state.contract)
    let Ustate= useSelector((state)=>state.Ucontract)
    let dispatch=useDispatch();

    

    const [date, setDate] = useState(new Date());

    const onChange = (newDate) => {
      setDate(newDate);
      setIsModalOpen(false)
    };
    let [isModalOpen,setIsModalOpen]=useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(UchangeState({ field: name, value: value }))
          
        
      };

  return (
    
        <div className="">
            <div className="input_address">
                <div className="input_title ">
                    <div>| </div>
                    <div>입금 정보 및 결제 정보를 입력해 주세요          </div>
                </div>
                <div className="input_title_sub py-4    ">
                    <div>입금자명은 임차인 이름으로 입력해야하며 이용료 및 총 결제금액은 송금액 입력 시 자동 표기됩니다</div>
                </div>
                <div className="input_row">
                     <input placeholder="입금자 이름을 입력하세요" type="text" value={Ustate.sender}  onChange={handleChange}  name="sender"></input>

                    <label>입금자명 (임차인)</label>
                </div>
                <div className="input_row">
                     <input placeholder="송금하실 임대료를 입력하세요" type="text" value={Ustate.monthlyRent}  onChange={handleChange}  name="monthlyRent"></input>

                    <label>임대료 (송금액)</label>
                </div>



                <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="  "><div className="btn_cta">즉시 송금</div></div>
                    <div className="  "><div className="btn_cta_sub" onClick={()=>setIsModalOpen(true)}>예약 송금</div></div>    
                
                </div>

                <Modal open={isModalOpen} >
                        <Calendar onChange={onChange} value={date} />
                </Modal>
                

               
                <div className="amount_card">
                    <div className="row">
                        <div className="title">월세 플랫폼 이용료</div>
                        <div className="data">3.9%(VAT별도)</div>
                    </div>
                    <div className="row">
                        <div className="title">총 결제금액</div>
                        <div className="data">송금액 입력 시 자동 산출됩니다.</div>
                    </div>
                </div>

                          
            </div>
 
            
    
        

        </div>
    
  );
}
