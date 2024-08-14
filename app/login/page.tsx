"use client";
import React, { Suspense } from "react";
import { useState } from "react";
import {
  EyeIcon,
  EyeOffIcon,
  MailIcon,
  LockClosedIcon,
} from "@heroicons/react/solid";
import Image from "next/image";
import LoginSignUpSideComponent from "../components/LoginSignUpSideComponent";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { useAuth } from "../context/AuthContext";

type Props = {};

const LoginPage = (props: Props) => {
  const { isLogin } = useAuth();

  return (
    <div className="flex h-full">
      <LoginSignUpSideComponent />
      <Suspense fallback={<div>Loading...</div>}>
        {isLogin ? <LoginForm /> : <SignupForm />}
      </Suspense>
    </div>
  );
};

export default LoginPage;
