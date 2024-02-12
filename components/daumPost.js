import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";

const Post = (props) => {
  const address = props.address;
  const setAddress = props.setAddress;

  const setIsModalOpen = props.setIsModalOpen;

  const onCompletePost = (data) => {
    console.log(data);
    setAddress(data.address);
    setIsModalOpen(false);
  };

  const postCodeStyle = {
   
    display: "block",
 
    width: "100%",
    height: "400px",
    padding: "7px",
    
    
  };

  return (
    <>
    
        <DaumPostcode
          style={postCodeStyle}
          autoClose
          onComplete={onCompletePost}

        />
     
    </>
  );
};

export default Post;