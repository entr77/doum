// pages/api/upload.js
import { IncomingForm } from 'formidable';
import fs from 'fs-extra';

export const config = {
  api: {
    bodyParser: false,
  },
};
function getFileExtension(filename) {
   let tmp=filename.split(".");
  
  return tmp[1];
}
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm();
    form.uploadDir = './public/contract'; // Set the upload directory

    form.parse(req, async (err, fields, files) => {
      //console.log(files);
      if (err) {
        return res.status(500).json({ error: 'Error parsing form data.' });
      }

      const { file } = files;
      file.name=file[0].newFilename;
      file.path=file[0].filepath;
      file.originalFilename=file[0].originalFilename;
      //console.log(file.originalFilename);

      let ext=getFileExtension(file.originalFilename);

      //console.log("ext:"+ext);
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }

      const filePath = `./public/contract/${file.name}.${ext}`;
      
      let contract=`https://api.doumpay.com/contract/${file.name}.${ext}`;
      
      console.log("filePath : "+filePath);
      try {
        await fs.move(file.path, filePath);
         return res.status(200).json({ success: true, contract: contract, message: '파일 업로드가 성공적으로 완료되었습니다.' });

      } catch (error) {
        return res.status(500).json({ error: 'Error saving the file.' });
      }
    });
  } else {
    return res.status(405).json({ error: 'Method not allowed.' });
  }
}
