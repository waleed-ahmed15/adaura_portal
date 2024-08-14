import Image from "next/image";
import React from "react";

type Props = {};

const LoginSignUpSideComponent = (props: Props) => {
  return (
    <div className="bg-[#64748B] max-md:hidden  w-5/12 flex flex-col p-6">
      <Image src="/adaura_logo.svg" alt="" width={200} height={200} />
      <div className="relative flex items-center h-full justify-center">
        <Image src="/bg_circle1.png" alt="" width={600} height={600} />
        <Image
          src="/bg_circle1.png"
          alt=""
          className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          width={300}
          height={300}
        />
        <div className="w-[400px] h-[200px] rounded-xl flex items-center justify-center bg-white absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Image src="/image_icon.png" alt="" width={100} height={100} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mb-24 gap-2">
        <p className="text-white font-semibold text-h-small">
          Empowering Your Digital Evolution
        </p>
        <p className="text-gray-300 text-b-small">
          Everything you need in an easily customizable dashboard.
        </p>
      </div>
    </div>
  );
};

export default LoginSignUpSideComponent;
