import Image from "next/image";
import SvcIcon from "/components/svcIcon";

  

export default function Home() {
  let banner=0;




  return (

    
    <div style={{height:"100vh"}}>
      
      <div className="mainSvc content_main container   pt-8">
        <div className="px-6 pb-4">
        <img src="/image/banner/svc_icon_title.png" alt="설명"/>  
        </div>
        <SvcIcon banner={banner}></SvcIcon>
        
        <div className="py-6 px-6">
          <div className="">
            <img src="/image/banner/banner_benefit_title.png" alt="설명"/>  
          </div>
          <div className="py-4">
            <img src="/image/banner/banner_benefit.png" alt="설명"/>  
          </div>
        </div>
      </div>
 
      
      
      <div className="top">
      <div className="mainBanner container">
        <img src="/image/banner/main_banner_1.png" alt="설명"/>  
      </div>
    </div>
    
    </div>
    
  );
}
