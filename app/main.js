'use client'


import { useRouter } from "next/navigation"
import { useState,useEffect } from "react"



export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function main({ children }) {
  let [fade, setFade] = useState('')
  

  useEffect(()=>{
    setFade('end')
  }, [children])
  const router = useRouter
  return (
     
        <main >

          
                      {children}
             
       
  );
}


