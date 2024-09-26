'use client'

import React from "react";
import { useAuth } from "./AuthContext"; 

const Page = () => {
  const { emailRef, passwordRef } = useAuth(); 

  const handleTest = (e:React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    console.log(emailRef.current!.value)
    console.log(passwordRef.current!.value)
   }

  return (
    <form name="formA">
      <input ref={emailRef} placeholder="email" type="text" className="bg-black border" />
      <input ref={passwordRef} placeholder="password" type="text" className="bg-black border" />
      <button className="border" onClick={(e)=>handleTest(e)}>
        Sign Up
      </button>
    </form>
  );
};

export default Page;
