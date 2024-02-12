
export  function Ocr(contract){
    console.log("OCR");
    
    var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-OCR-SECRET", "RnJvRkVxeExiY2F0VFFBeWtwaGRZRWNOaEtReU55cEQ=");
  
  let ret;
  let ret2;
  var raw = JSON.stringify({
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
    "timestamp": 1706512646,
    "version": "V1"
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch(contract, requestOptions)
  .then((res) => res.json())
  .then((json) => {
    let data=json.images[0];
    let fields=data.fields;
    
    fields.map((a,i)=>{
      console.log(a.name);
      console.log(a.inferText);
    })
    
  })
    .catch(error => console.log('error', error));

    return 
    <div></div>
  
  }