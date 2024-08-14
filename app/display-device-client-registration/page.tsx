"use client";
import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import LoginSignUpSideComponent from "../components/LoginSignUpSideComponent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

const ClientDeviceRegistrationForm = () => {
  const searchParams = useSearchParams();

  const deviceID = searchParams.get("deviceID") ?? "1234";
  const companyID = "XO9tWIECEpVSzHSycEVL";
  const [deviceName, setDeviceName] = useState("");
  const [deviceAddress, setDeviceAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const registerDevice = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const url = new URL(
      "http://192.168.18.19:3000/api/display-device-client-registration"
    );
    url.searchParams.append("deviceID", deviceID);
    url.searchParams.append("companyID", companyID);
    url.searchParams.append("deviceName", deviceName);
    url.searchParams.append("address", deviceAddress);

    try {
      const response = await fetch(url.toString(), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Device registered successfully!");
        console.log("Device registered successfully!");
      } else {
        toast.error("Device registration failed!");
        console.log("Device registration failed!");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.log("An error Occured");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-row">
      <LoginSignUpSideComponent />

      <div className="flex-1">
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="w-full max-w-md p-8 space-y-6">
            <div className="flex flex-col items-start justify-self-center gap-2">
              <h2 className="text-center text-h-small font-bold text-gray-900">
                Register
              </h2>
              <p className="text-center text-poppins-22.4-normal text-primary">
                Welcome! please enter your details
              </p>
            </div>

            <form onSubmit={registerDevice} className="space-y-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Image src="mail_icon.svg" alt="" width={18} height={4} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="block w-full pl-10 pr-4 py-4 placeholder:text-b-large border border-[#E2E8F0] rounded-xl shadow-sm focus:outline-none text-b-medium font-semibold text-black"
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
                  className="block w-full pl-10 pr-10 py-4 border-2 placeholder:text-b-large border-[#E2E8F0] text-b-large font-semibold text-black rounded-xl shadow-sm focus:outline-none"
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
                  type="text"
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                  placeholder="Device Name"
                  className="block w-full pl-10 pr-4 py-4 border placeholder:text-b-large border-[#E2E8F0] rounded-xl shadow-sm focus:outline-none text-b-large font-semibold text-black"
                  required
                />
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Image src="user_company.svg" alt="" width={18} height={4} />
                </div>
                <input
                  type="text"
                  value={deviceAddress}
                  onChange={(e) => setDeviceAddress(e.target.value)}
                  placeholder="Device Address"
                  className="block w-full pl-10 pr-4 py-4 border placeholder:text-b-large border-[#E2E8F0] rounded-xl shadow-sm focus:outline-none text-b-large font-semibold text-black"
                  required
                />
              </div>
              {isLoading ? (
                <div className="items-center flex flex-row justify-center">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-4 px-4 border border-gray-400 rounded-xl shadow-sm text-b-medium text-primary font-semibold bg-white hover:bg-gray-50 focus:outline-none"
                >
                  Register
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const CLientDeviceRegistrationPage = (props: Props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <ClientDeviceRegistrationForm />
  </Suspense>
);

export default CLientDeviceRegistrationPage;
