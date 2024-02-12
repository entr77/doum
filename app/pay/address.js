'use client'
import Image from "next/image";
import SvcIcon from "/components/svcIcon";
import Link from 'next/link'

import {useState} from 'react'
import { useEffect } from "react";
import Footer_pay from "./footer_pay";
import {ocrParse,ocrParseP,ocrParseDummy} from "/utils/ocr"


import { Provider } from "react-redux";
import store from '/redux/store.js'

import { useDispatch, useSelector } from "react-redux"


import { changeState } from  "/redux/store/contract.js"
import { UchangeState } from "/redux/store/Ucontract.js"

import Modal from "/components/modal.tsx"
import Post from '/components/daumPost'




export default function address({ contractInfo, onContractInfoChange }) {

 
  const [address, setAddress] = useState(''); // 주소
  const [address_sub, setAddress_sub] = useState(''); // 상세주소

  let [isModalOpen,setIsModalOpen]=useState(false)

  
  let state= useSelector((state)=>state.contract)
  let Ustate= useSelector((state)=>state.Ucontract)
  let dispatch=useDispatch();
 
  

  const postCodeStyle = {
    display: 'block',
    position: 'relative',
    top: '0%',
    width: '400px',
    height: '400px',
    padding: '7px',
  };
 
      
      useEffect(() => {
        /* 카카오 주소검색 주소 */
        console.log(address)
        if(address){
          dispatch(UchangeState({ field: "address", value: address }))
          dispatch(UchangeState({ field: "address_sub", value: "" }))
        }
      }, [address]);  


      const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(UchangeState({ field: name, value: value }))
          
        
      };
     
  
  return (
    
        <div className="">

    
            
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <Post address={address} setAddress={setAddress} setIsModalOpen={setIsModalOpen}></Post>
            </Modal>
    

            <div className="input_address">
                <div className="input_title ">
                    <div>| </div>
                    <div>입력된 주소를 확인해주세요            </div>
                </div>

                <div className="input_title_sub py-4    ">
                    <div>임대차 계약서 주소와 다르게 입력 되었다면 </div>
                    <div>  확인 후 정확한 주소를 다시 입력해 주세요</div>
                </div>
                <div className="input_row">
                    <input placeholder="계약서의 주소를 정확히 입력해주세요"  type="text"  value={Ustate.address}  onClick={()=>setIsModalOpen(true)}       name="address"></input>
                    <label>주소</label>
                </div>
                <div className="input_row">
                    <input placeholder="계약서의 주소를 정확히 입력해주세요" type="text" value={Ustate.address_sub}  onChange={handleChange}  name="address_sub"></input>
                    <label>상세주소</label>
                </div>

                {/* <div>
                    <ul className="alert_list">
                      {Ustate.isRoadAddress}
                    {
                       Ustate.isRoadAddress ? (
                            <li className="">* 계약서의 주소는 도로명 주소입니다.</li>
                        )
                        :(
                          <li className="">* 계약서의 주소는 도로명 주소가 아닙니다.</li>
                        )
                    }
                    </ul>

                </div> */}
                <div>
                    <table>
                     {Object.entries(Ustate).map(([key, value]) => (
                      <tr className="text-left" key={key}>
                        <th>{key}</th>
                        {/* key가 "image"인 경우에만 링크 추가 */}
                        {key === 'image' ? (
                          <td>
                            <a href={value} target="_blank" rel="noopener noreferrer">
                              {value}
                            </a>
                          </td>
                        ) : (
                          <td>{value}</td>
                        )}
                      </tr>
                    ))}

                </table>
         
                
                </div>
            </div>

            
 
            
            
    
        

        </div>
    
  );
}
