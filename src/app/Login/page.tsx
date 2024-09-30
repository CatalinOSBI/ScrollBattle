"use client";

import React from "react";
import Googlebutton from "../ui/Googlebutton";
import { useAuth } from "./AuthContext";

const Page = () => {
  const {
    emailLogRef,
    passwordLogRef,
    emailRef,
    passwordRef,
    userEmail,
    handleSignUp,
    handleSignOut,
    handleLogIn,
  } = useAuth();

  return (
    <>
      {/* Sign Up */}
      <form
        name="formA"
        onSubmit={(e) =>
          handleSignUp(emailRef.current!.value, passwordRef.current!.value, e)
        }
      >
        <input
          ref={emailRef}
          placeholder="email"
          type="text"
          className="bg-black border"
        />
        <input
          ref={passwordRef}
          placeholder="password"
          type="text"
          className="bg-black border"
        />
        <button className="border" type="submit">
          Sign Up
        </button>
      </form>

      {/* Log In */}
      <form
        name="formB"
        onSubmit={(e) =>
          handleLogIn(emailLogRef.current!.value, passwordLogRef.current!.value, e)
        }
      >
        <input
          ref={emailLogRef}
          placeholder="email"
          type="text"
          className="bg-black border"
        />
        <input
          ref={passwordLogRef}
          placeholder="password"
          type="text"
          className="bg-black border"
        />
        <button className="border" type="submit">
          Log 
        </button>
      </form>

      {/* Sign Out */}
      <button className="border" onClick={handleSignOut}>
        Sign Out
      </button>
      <button className="border" onClick={() => console.log(userEmail)}>
        log
      </button>

      {/* Google Oauth */}
      <Googlebutton />
    </>
  );
};

export default Page;
