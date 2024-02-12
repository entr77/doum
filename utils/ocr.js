 
// utils/ocrUtils.js
import axios from 'axios';

export async function ocrParse(contract) {
  
  console.log("OCR start " + contract);

  var myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("X-OCR-SECRET", "RnJvRkVxeExiY2F0VFFBeWtwaGRZRWNOaEtReU55cEQ=");
  let timestampVariable = Math.floor(new Date().getTime() / 1000); // Get the current timestamp in seconds

  let raw = JSON.stringify({
    "images": [
      {
        "format": "jpg",
        "name": "medium",
        "data": null,
        "url": contract
      }
    ],
    "lang": "ko",
    "requestId": "string",
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

  console.log("OCR fetch");
  //console.log(requestOptions);
   
  try {
    const response = await fetch("https://2c1ytsgeq2.apigw-pub.fin-ntruss.com/custom/v1/5338/37fd5292c34f1b6d121b86d66ce716e433a2059c61a1cef601f752e92682327c/infer", requestOptions);
    //const response = await fetch("/pages/api/ocr_dummy", requestOptions);
   
    if (!response.ok) {
      // Handle non-OK response here if needed
       throw new Error(`OCR request failed with status: ${response.status}`);
    }
    //console.log(response)
    const json = await response.json();

    console.log("OCR result");
    //console.log(json);

    let data = json.images[0];
    let fields = data.fields;
   // console.log(fields);
    const result = {}; 
    fields.map((a, i) => {
      // console.log(a.name);
      // console.log(a.inferText);
      if(a.name=="소재지"){
        result.address=a.inferText;
        //console.log(a.inferText);
      }
      result.address_sub=a.inferText;
    });
    result.image=contract
    console.log(result);
    
    
    return { success: true, message: "OCR parsing successful", contract: result };
  } catch (error) {
    //console.error('OCR request failed:', error.message);
    console.log(requestOptions)
    return { success: false, message: "OCR parsing failed", error: error.message };
  }
}

export async function ocrParseDummy(contract="https://app.doumpay.com/contract/c1.jpg") {

  contract=`https://app.doumpay.com/contract/c2.jpg`;
  console.log("OCR Dummy start " + contract);

  try {
    
    let result={
      address:"서울시 동작구 흑성한강로 12",
      address_sub:"113동 1203호"
    }
    return { success: true, message: "OCR parsing successful", result: result };
  } catch (error) {
    //console.error('OCR request failed:', error.message);
    return { success: false, message: "OCR parsing failed", error: error.message };
  }
}



export async function ocrParseP(contract) {
  contract="https://app.doumpay.com/contract/c2.jpg";
  console.log("OCRP start " + contract);

  var myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("X-OCR-SECRET", "RnJvRkVxeExiY2F0VFFBeWtwaGRZRWNOaEtReU55cEQ=");
  let timestampVariable = Math.floor(new Date().getTime() / 1000); // Get the current timestamp in seconds

  let raw = JSON.stringify({
    "images": [
      {
        "format": "jpg",
        "name": "medium",
        "data": null,
        "url": contract
      }
    ],
    "lang": "ko",
    "requestId": "string",
    "resultType": "string",
    "timestamp": timestampVariable,
    "version": "V2"
  });

  var requestOptions = {
    method: 'POST',
    credentials: 'include', // 또는 'same-origin
    headers: {
      "Content-Type":'application/json',
      "X-OCR-SECRET":'RnJvRkVxeExiY2F0VFFBeWtwaGRZRWNOaEtReU55cEQ='
    },
    body: raw,
    redirect: 'follow',
    mode: 'no-cors'
  };

  console.log("OCR fetch");
  console.log(requestOptions);
   
  try {
    const response = await fetch("https://api.ioplate.com/api/myrecipe/ocr", requestOptions);
    //const response = await fetch("/pages/api/ocr_dummy", requestOptions);
    console.log(response);
    if (!response.ok) {
      // Handle non-OK response here if needed
       //throw new Error(`OCR request failed with status: ${response.status}`);
    }

    const json = await response.json();
 
    
    return { success: true, message: "OCR parsing successful", result: json };
  } catch (error) {
    //console.error('OCR request failed:', error.message);
    return { success: false, message: "OCR parsing failed", error: error.message };
  }
}


export async function ocrParseA(contract) {
  contract="https://app.doumpay.com/contract/c2.jpg";
  console.log("OCR start " + contract);

  var myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("X-OCR-SECRET", "RnJvRkVxeExiY2F0VFFBeWtwaGRZRWNOaEtReU55cEQ=");
  let timestampVariable = Math.floor(new Date().getTime() / 1000); // Get the current timestamp in seconds
  const apiUrl = 'https://2c1ytsgeq2.apigw-pub.fin-ntruss.com/custom/v1/5338/37fd5292c34f1b6d121b86d66ce716e433a2059c61a1cef601f752e92682327c/infer'; // 외부 API 엔드포인트

  const requestData = {
    images: [
      {
        format: 'jpg',
        name: 'medium',
        data: null,
        url: contract,
      },
    ],
    lang: 'ko',
    requestId: 'string',
    resultType: 'string',
    timestamp: Math.floor(new Date().getTime() / 1000),
    version: 'V2',
  };

  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'X-OCR-SECRET': 'RnJvRkVxeExiY2F0VFFBeWtwaGRZRWNOaEtReU55cEQ=',
    },
    // 기타 설정
    timeout: 5000, // 타임아웃 설정
    
  };



  console.log("OCR fetch");
  //console.log(requestOptions);
  try {
    const response = await axios.post(apiUrl, requestData, requestOptions);

    const json = await response.json();

    console.log("OCR result");
    //console.log(json);

    let data = json.images[0];
    let fields = data.fields;
   // console.log(fields);
    const result = {}; 
    fields.map((a, i) => {
      // console.log(a.name);
      // console.log(a.inferText);
      if(a.name=="소재지"){
        result.address=a.inferText;
        //console.log(a.inferText);
      }
      result.address_sub=a.inferText;
    });
    console.log(result);
    
    
    
    return { success: true, data: response.data };
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    return { success: false, error: error.message };
  }
  
  
   
}
