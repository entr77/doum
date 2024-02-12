const axios = require('axios');

// API 호출을 위한 기본 설정
const apiKey = 'YOUR_API_KEY';
const apiUrl = 'https://developers.open-platform.or.kr';
const apiPath = '/openapi/'; // API 경로
const bankCodeEndpoint = 'lookup';
const bankCodeQuery = 'bank'; // 은행 코드 조회 API

// 은행 코드 조회 API 호출
async function getBankCodes() {
    try {
        const response = await axios.get(apiUrl + apiPath + bankCodeEndpoint + '?' + bankCodeQuery, {
            headers: {
                Authorization: 'Bearer ' + apiKey
            }
        });
        return response.data;
    } catch (error) {
        console.error('API 호출 오류:', error);
        return null;
    }
}

// 은행 코드 조회 및 출력
getBankCodes()
    .then(data => {
        if (data) {
            console.log('은행 코드:', data);
        } else {
            console.log('은행 코드 조회 실패');
        }
    });
