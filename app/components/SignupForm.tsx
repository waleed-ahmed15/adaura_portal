import React from "react";
import { useState } from "react";
import {
  EyeIcon,
  EyeOffIcon,
  MailIcon,
  LockClosedIcon,
} from "@heroicons/react/solid";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
type Props = {};

const SignupForm = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyID, setCompanyID] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { toggleAuth } = useAuth();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };
  return (
    <div className="flex-1">
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 space-y-6 ">
          <div className="flex flex-col items-start justify-self-center gap-2">
            <h2 className="text-center text-h-small font-bold text-gray-900">
              Sign Up
            </h2>
            <p className="text-center text-poppins-22.4-normal text-primary">
              Welcome! please enter your details{" "}
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Image src="mail_icon.svg" alt="" width={18} height={4} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="block w-full pl-10 pr-4 py-4 placeholder:text-b-large   border border-[#E2E8F0] rounded-xl shadow-sm focus:outline-none  text-b-medium font-semibold text-black"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
                <Image src="lock.svg" alt="" width={18} height={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="block w-full pl-10 pr-10 py-4 border-2 placeholder:text-b-large border-[#E2E8F0] text-b-large font-semibold text-black rounded-xl shadow-sm focus:outline-none "
                required
              />
              {showPassword ? (
                <EyeOffIcon
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <EyeIcon
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Image src="user_company.svg" alt="" width={18} height={4} />
              </div>
              <input
                type="Company ID"
                value={companyID}
                onChange={(e) => setCompanyID(e.target.value)}
                placeholder="Company ID"
                className="block w-full pl-10 pr-4 py-4 border placeholder:text-b-large border-[#E2E8F0] rounded-xl shadow-sm focus:outline-none  text-b-large font-semibold text-black"
                required
              />
            </div>
            <div className="pt-5">
              <button
                type="submit"
                className="w-full  py-4 px-4 border border-transparent rounded-xl shadow-sm text-b-medium font-semibold text-white bg-primary hover:bg-primary focus:outline-none  focus:ring-offset-2"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="flex items-center justify-center py-3 gap-3">
            <div className=" flex-1 h-1 border-b-2"></div>
            <span className="text-b-small text-gray-500">Or</span>
            <div className=" flex-1 h-1 border-b-2"></div>
          </div>

          <button
            type="button"
            onClick={toggleAuth}
            className="w-full py-4 px-4 border border-gray-400 rounded-xl shadow-sm text-b-medium  text-primary font-semibold bg-white hover:bg-gray-50 focus:outline-none"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
