'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import {Swiper,SwiperSlide} from "swiper/react"
import 'swiper/css';
import Image from 'next/image'

import styled from "styled-components";

export default function svc_icon(){
    

 
    
    let [swiper_img,setSwiperimg]=useState([]);


    
    useEffect(() => {
        
        let swiper_img=[
            {img:"/image/pay/my/card_bg_1.png",cardId:"/pay"},
            {img:"/image/pay/my/card_bg_2.png",cardId:"/pay"},
            {img:"/image/pay/my/card_bg_3.png",cardId:"/pay"},
            {img:"/image/pay/my/card_bg_4.png",cardId:"/pay"},
            {img:"/image/pay/my/card_bg_new.png",cardId:""}
        ]
        setSwiperimg(swiper_img);
      },[]);
    

    return (
        
        <div className="">
            <Swiper
            spaceBetween={0}
            slidesPerView={1.2}
            slidesOffsetBefore={12}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        
            >
                
                {
                    swiper_img.map((a,i)=>
                
                
                    <SwiperSlide key={i}>
                        <div className="relative my_card ">
                        <img src={a.img}  alt="서비스배너"  className="img"/>
                        { a.cardId!="" &&
                            <div>
                                <span className="btn_edit"><Image src="/image/pay/my/btn_edit.png" width="24" height="24"></Image></span>
                                <span className="btn_link"><Image src="/image/pay/my/btn_arrow_right.png" width="24" height="24"></Image></span>
                                <span className="address">삼성에버빌 117동 1204호</span>
                                <span className="name">임대인 : 홍길동</span>
                                <span className="account">카카오뱅크 3333-2312321-12</span>
                            </div>
                            
                        }
                        </div>
                    </SwiperSlide>
                )}
        

                
                


                
            </Swiper>
        </div>
  
    )
}