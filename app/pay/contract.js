'use client'
import Image from "next/image";
import SvcIcon from "/components/svcIcon";
import Link from 'next/link'
import React,{ useState,useRef  } from "react";
import Webcam from 'react-webcam';

import {ocrParse,ocrParseP} from "/utils/ocr"

 import FormData from 'form-data'
 import { useEffect } from "react";

 import { Provider } from "react-redux";
 import store from '/redux/store.js'
 
 
import { useDispatch, useSelector } from "react-redux"
  


import { changeState } from  "/redux/store/contract.js"
import { UchangeState } from "/redux/store/Ucontract.js"
 
 




export default function contract({setPayStep},{router}) {
  
  let state= useSelector((state)=>state.contract)
  let Ustate= useSelector((state)=>state.Ucontract)
  let dispatch=useDispatch();

  const [pasring, setParsing] = useState(false);
  const [file, setFile] = useState(null);

  const webcamRef = useRef(null);


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

  };
  const fileInputRef = React.createRef();

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };
  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = dataURItoBlob(imageSrc);
    const file2 = new File([blob], 'captured-image.png', { type: 'image/png' });
 

    setFile(file2);
  };
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
  };


  const handleUpload  = async (e) => {
    
    e.preventDefault();

    if (!file) {
      console.error('Please select a file.');
      return;
    }
    setParsing(true);
    const formData = new FormData();
    //encodeURIComponent(file.name)
    formData.append('file', file);


    const uploadFileName = uuid() + ".png";			// uuid를 통해 파일 이름 랜덤으로 뽑기
    console.log(uploadFileName)
    if (file === null) return;
    const imageRef = ref(storage, `images/${uploadFileName}`);		// images 폴더에 저장
    uploadBytes(imageRef, file);

    

    return
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        console.log('File uploaded successfully.');
        
        const result = await response.json();
        console.log(result);

 
        setPayStep(1);

         

        
      } else {
        console.error('File upload failed.');
      }
    } catch (error) {
      console.error('Error during file upload:', error);
    }
  }; 
           
  let [src, setSrc] = useState('')
 

  return (
    
        <div  >
          {
            pasring ?(
          
          <div className="ing">
            <div className="app_title ">
            임대차 계약서를 자동인식합니다            </div>
            <div className="app_title ">
            항목을 확인중입니다            </div>
            <div className="content_progress  ">
              <div className="cp-spinner cp-bubble align-center mt-auto mb-auto"></div> 
            </div>
       

          </div>
          ) :(
          
          
          <div className="ready">
                
                <div className="app_title ">
                임대차 계약서를 준비해주세요
                </div>
                <div className="app_title_sub py-4  grid place-items-center ">
                    <div>월세카드결제 서비스를 이용하기 위해서는</div>
                    <div> 임대차 계약서가 필요합니다</div>
                </div>
                <div className="py-10 grid place-items-center">
                    
                    <img src="/image/pay/contract.png" width='200' height='278' alt="계약서"/>  
                </div>
                <div className="app_comment pb-4">
                    임대차 계약서가 왜 필요한가요?
                </div>
            
                <div>
                    <div className="py-2">

                        
                    <form   encType="multipart/form-data">
                    <input type="file"          ref={fileInputRef}       style={{ display: 'none' }} onChange={
                      async(e)=>{
                        setParsing(true);
                        let file=e.target.files[0]
                        let filename=encodeURIComponent(file.name)
                        let res=await fetch('/api/image?file='+filename)
                        res=await res.json()
                        console.log(res)
                        
                        //S3 업로드
                        const formData = new FormData()
                        Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
                          formData.append(key, value)
                        })
                        formData.append("url", res.url)
                         let upload_result = await fetch(res.url, {
                          method: 'POST',
                          body: formData,
                        })
                        console.log(upload_result)
                        
                        if (upload_result.ok) {
                          setSrc(upload_result.url + '/' + res.fields['key'])
                        
                        
                           
                        
                        } else {
                          console.log('실패')
                        }
                        
                       
                        


                        let 업로드결과=await fetch(`/api/contract_parse?contract=${upload_result.url + '/' +  res.fields['key']}`,{
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                        })

                        console.log(업로드결과)

                         if (업로드결과.ok) {
                          console.log(업로드결과)
                          //setSrc(업로드결과.url + '/' + filename)
                          
                          const result = await 업로드결과.json();
                          {Object.keys(result).map(key => (
                            
                            dispatch(changeState({ field: key, value: result[key] }))
                            
                          ))}
                          {Object.keys(result).map(key => (
                              
                            dispatch(UchangeState({ field: key, value: result[key] }))
                            
                          ))}
                          
                          
                          // dispatch(changeState({ field: 'pasrseResult', value: '200' }));

                          // dispatch(changeState({ field: 'image', value: result.image }));

                          // dispatch(changeState({ field: 'address', value: result.address }));
                          // dispatch(changeState({ field: 'address_sub', value: result.address_sub }));

                          // dispatch(changeState({ field: 'bankName', value: result.bankName }));
                          // dispatch(changeState({ field: 'account', value:result.account }));

                          // dispatch(changeState({ field: 'accountHolder', value: result.accountHolder }));

                          // dispatch(changeState({ field: 'lessee', value: result.lessee }));
                          // dispatch(changeState({ field: 'lessor', value: result.lessor }));
                          // dispatch(changeState({ field: 'template', value: result.template }));
                          // dispatch(changeState({ field: 'isRoadAddress', value: result.isRoadAddress }));
                          // dispatch(changeState({ field: 'monthlyRent', value: result.monthlyRent }));

 
                          // dispatch(changeImage(result.image));  
                          // dispatch(changeAddress(result.address));  
                          // dispatch(changeAddress_sub(result.address_sub));  

                          // dispatch(changeBankname(result.bankName));  
                          // dispatch(changeAccount(result.account));  
                          // dispatch(changeAccountholder(result.accountHolder));  
                          // dispatch(changeLessee(result.lessee));  
                          // dispatch(changeLessor(result.lessor));  
                          
                          // dispatch(changeTemplate(result.template));

                          // dispatch(changeisRoadAddress(result.isRoadAddress));

                          // dispatch(changeMonthlyRent(result.monthlyRent));  

                          

                          
                          console.log("적용된 템플릿" + result.template);
                          

                           
                          setPayStep(1);

                          
                        } else {
                          
                          const result = await 업로드결과.json();
                          console.log('실패 : ' + result.code+":"+result.message)
                          console.log(result)
                          dispatch(changeState({ field: 'pasrseResult', value:result.parseReult }));
                          // dispatch(changeParseResult(result.parseReult));  
                          setParsing(false);  // 오류가 났으니 파일 입력받는 폼을 다시 켜주자
                        }

                      }
                    } accept="image/*"/>
                    <img src={src} />

                      
                    </form>
                        
                        <button className="btn_cta_sub" onClick={handleFileInputClick}   >임대차 계약서 사진 등록</button>
                        
                  
                    </div>
                    <div className="py-2">
                    
                          <div className="btn_cta" onClick={handleCapture} >
                          임대차 계약서 촬영하기 </div>
        
                    </div>
                    <div className="py-20"></div>
                </div>
            </div>
          )}
        </div>
    
        

    
  )
}
