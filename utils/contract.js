export default{

    splitAddress:function (fullAddress) {
        // 주소를 공백을 기준으로 분할
        const parts = fullAddress.split(' ');
        // 상세 주소는 주소 문자열의 마지막 부분이므로 배열의 마지막 요소를 추출
        const detailAddress = parts.pop();
        // 나머지 부분은 도로명 주소이므로 다시 문자열로 결합
        const roadAddress = parts.join(' ');
        // 추출한 상세 주소와 도로명 주소를 객체로 반환
        return { roadAddress, detailAddress };
      },

    isRoadAddress:function (address) {
    // 도로명 주소 패턴을 검사하기 위한 정규 표현식
    const regex = /(도|시|특별시|광역시) (\S+) (구|군|광역시) (\S+) (동|읍|면) (\S+)/;
  
    // 정규 표현식과 매치되는지 확인하여 도로명 주소 여부를 반환
    return regex.test(address);
  },
  
  
  getFileExtension:function (filename) {
    let tmp=filename.split(".");
    
   
   return tmp[tmp.length-1];
  },
  extractBankAccount:function (text) {
    // 대한민국 은행명과 계좌번호 및 예금주를 추출하는 정규 표현식
     
    const regexList = [
        /([가-힣]+은행)\s*(\d{3}-\d{3}-\d{6})\s*예금주\s*([가-힣\s]+)\s*계좌로/g,
        /임대인 계좌 (\S+)\s+(\d{3}-\d{3}-\d{6}) 예금주 (.+)/,
        /([가-힣]+은행) (\d{3} \d{3} \d{6}) ([가-힣]+)/g,
        
        
        
        
    ];

    let matches = [];
    // 각 정규식을 순회하면서 매치를 찾음
    let cnt=0;
    for (const regex of regexList) {
        console.log(cnt++)
        const match = regex.exec(text);
        // 정규식에 맞는 매치를 찾아 matches 배열에 추가
        if (match) {
            matches.push({
                // 여기에서 정규식에 따라 필요한 정보 추출 및 객체에 저장
                bankName: match[1] ? match[1] : '', // 은행명
                accountNumber: match[2] ? match[2] : '', // 계좌번호
                accountHolder: match[3] ? match[3].trim() : '', // 예금주
                landlord: match[4] ? match[4].trim() : '' // 임대인
            });
        break;

        }
    }
        
    if (matches.length == 0) {matches = [{"bankName":"","accountNumber":"","accountHolder":""}];}
    return matches;
  },
  koreanToNumber:function (korean) {
    const koreanNumbers = {
        '일': 1, '이': 2, '삼': 3, '사': 4, '오': 5,
        '육': 6, '칠': 7, '팔': 8, '구': 9,
        '십': 10, '백': 100, '천': 1000, '만': 10000,
        // 더 많은 숫자에 대한 매핑은 필요에 따라 추가할 수 있습니다.
    };

    let result = 0;
    let tempValue = 0;

    for (const char of korean) {
        const value = koreanNumbers[char];
        if (value) {
            if (value >= 10) {
                result += tempValue * value;
                tempValue = 0;
            } else {
                tempValue += value;
            }
        } else {
            return NaN; // 잘못된 한글이 들어온 경우 NaN 반환
        }
    }

    return result + tempValue;
}

 

  
  

};