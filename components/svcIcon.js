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
            {img:"/image/banner/svc_icon_1.png",link:"/pay"},
            {img:"/image/banner/svc_icon_2.png",link:"/light"},
            {img:"/image/banner/svc_icon_3.png",link:"/"},
            {img:"/image/banner/svc_icon_4.png",link:"/insurance"},
            {img:"/image/banner/svc_icon_5.png",link:"/faq"}
        ]
        setSwiperimg(swiper_img);
      },[]);
    

    return (
        
        <div className="">
            <Swiper
            spaceBetween={10}
            slidesPerView={2.6}
            slidesOffsetBefore={12}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        
            >
                
                {
                    swiper_img.map((a,i)=>
                
                
                    <SwiperSlide key={i}><Link href={a.link}><img src={a.img}  alt="서비스배너" width="200" height="200" className="img"/></Link></SwiperSlide>
                )}
        

                
                


                
            </Swiper>
        </div>
  
    )
}