 
// utils/ocrUtils.js

import contractUtils from "/utils/contract"

export default async function ocrParse(req,res) {
  
  

  var myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("X-OCR-SECRET", "RnJvRkVxeExiY2F0VFFBeWtwaGRZRWNOaEtReU55cEQ=");
  let timestampVariable = Math.floor(new Date().getTime() / 1000); // Get the current timestamp in seconds
  const { v4: uuidv4 } = require('uuid');

// UUID 생성
  const requestId = uuidv4();

   let raw = JSON.stringify({
    "images": [
      {
        "format": contractUtils.getFileExtension(req.query.contract),
        "name": "medium",
        "data": null,
        "url": req.query.contract,
        "enableTableDetection":true
      }
    ],
    "lang": "ko",
    "requestId": requestId,
    "resultType": "string",
    "timestamp": timestampVariable,
    "version": "V2"
  });
   var requestOptions = {
    method: 'POST',
    //credentials: 'include', // 또는 'same-origin
    headers: {
      "Content-Type":'application/json',
      "X-OCR-SECRET":'RnJvRkVxeExiY2F0VFFBeWtwaGRZRWNOaEtReU55cEQ='
    },
    body: raw,
    //redirect: 'follow',
    mode: 'no-cors',
    timeout: 5000, // 타임아웃 설정


  };

  console.log("OCR fetch : "+req.query.contract);
  //console.log(requestOptions);
   
  try {
    const response = await fetch("https://2c1ytsgeq2.apigw-pub.fin-ntruss.com/custom/v1/5338/37fd5292c34f1b6d121b86d66ce716e433a2059c61a1cef601f752e92682327c/infer", requestOptions);
    //const response = await fetch("/pages/api/ocr_dummy", requestOptions);
   
    
    //console.log(response)
    const json = await response.json();
    console.log(json)
    console.log("OCR result");
    
     

    if (!response.ok) {
      // Handle non-OK response here if needed
      
        console.log(" not ok ")
        console.log(json)
       //throw new Error(`OCR request failed with status: ${response.status}`);
       //return res.status(json.code).json(json.message)
    }
    
    
    if(json.code=="0011"){
      // 이미지가 없을때(서버에서 불러오지 못할경우 포함)
      console.log(json)
      return  res.status(401).json(json)
    }
    
    let data = json.images[0];
    
    let fields = data.fields;
    
   // console.log(fields);
   if(typeof data.fields=="undefined"){
    // 리턴 결과값이 엇ㅂ을때
    return  res.status("404").json({"code":"404","message":"데이터 추출 결과 없음"})
   }
   console.log(data.matchedTemplate)
   console.log(data.matchedTemplate.name)
    
    const result = {}; 
    
    fields.map((a, i) => {
      //a.name=a.name.replace(/\s+/g, ''); 
       console.log(a.name+": " +a.inferText);

      if(a.name=="소재지"){
        result.address=a.inferText;
        
        const { roadAddress, detailAddress } = contractUtils.splitAddress(result.address);

        result.address=roadAddress;
        result.address_sub=detailAddress;

        result.isRoadAddress=(contractUtils.isRoadAddress(a.inferText));

         //console.log(a.inferText);
      }
      
      if(a.name=="보증금_숫자"){
        //result.address=a.inferText;
        //console.log(a.inferText);
      }
      if(a.name=="임대인은행명"){
        result.bank=a.inferText;
        //console.log(a.inferText);
      }
      if(a.name=="임대인계좌번호"){
        result.account=a.inferText;
        //console.log(a.inferText);
      }
      
      if(a.name=="계좌정보"){
        const accountInfo=contractUtils.extractBankAccount(a.inferText);
 
        result.bankName=accountInfo[0].bankName;
        result.account=accountInfo[0].accountNumber;
        result.accountHolder=accountInfo[0].accountHolder;
        
        //console.log(a.inferText);
      }
      if(a.name=="임대인명" || a.name=="임대인성명"){
        result.lessee=a.inferText;
        //console.log(a.inferText);
      }
      if(a.name=="임차인명"){
        result.lessor=a.inferText;
        result.sender=a.inferText;
        
        
      }
      a.inferText=a.inferText.replace(/\s/g, ""); 
      if(a.name=="차임") console.log("월세 text:"+a.inferText)
      if(a.name=="차임" || a.name=="월세"|| a.name=="월세_국문"){
        let sentence = a.inferText;
        let regex = /[일이삼사오육칠팔구십백천만억조]+만원/g;
        let match = sentence.match(regex);
        let amountString="";
        let amount=0;
        if (match) {
            amountString = match[0].replace(/[만원]/g, ''); // '만원' 제거
            amount = contractUtils.koreanToNumber(amountString); // 한글 숫자를 숫자로 변환하는 함수 사용
            console.log(amount); // 추출된 금액 출력
            result.monthlyRent=amount*10000;
            result.monthlyRent=result.monthlyRent.toLocaleString()
        } 
         

        
        
      }

      
      
 

      
      
    });
    console.log(result.accountHolder)
    if(result.lessee && typeof result.accountHolder=="undefined") result.accountHolder=result.lessee  // 예금주가 따로 없는경우 임대인으로 표기
    result.image=req.query.contract
    result.template=data.matchedTemplate.name; // 적용된 템플릿
    console.log(result);
    
    
    // return { success: true, message: "OCR parsing successful", contract: result };
    res.status(200).json(result)
  } catch (error) {
        // 에러 처리
        console.error('외부 API 호출 중 에러:', error);

        // 에러 응답을 보낼 때 외부 API의 응답을 참조하고 싶은 경우
        if (error instanceof Error) {
          // 에러 객체를 통해 에러 정보 확인 가능
          console.error('에러 상세 정보:', error.message);
          // 에러 응답 처리
          res.status(500).json({ code:"500",message: '서버 에러 발생' });
        } else {
          // Promise가 거부된 경우
          res.status(500).json({ code:"500",message: '네트워크 에러 발생' });
        }

   
      


  }
} 