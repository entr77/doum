
import aws from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid';

export default async function handler(요청, 응답){
    aws.config.update({
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_KEY,
      region: 'ap-northeast-2',
      signatureVersion: 'v4',
    })

    

    const s3 = new aws.S3();
    // UUID를 사용하여 파일명 생성
    const uniqueFilename = `${uuidv4()}-${요청.query.file}`;


    const url = await s3.createPresignedPost({
      Bucket: process.env.BUCKET_NAME,
       Fields: { key: uniqueFilename },

      Expires: 60, // seconds
      Conditions: [
        ['content-length-range', 0, 10048576], //파일용량 1MB 까지 제한
      ],
    })
    
    
    응답.status(200).json(url)
}  