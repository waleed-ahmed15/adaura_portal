"use client";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";

type Props = {};

const Navbar = (props: Props) => {
  const pathname = usePathname();

  // Hide navbar on /login and any route that starts with /login
  console.log("Current pathname:", pathname);

  if (
    pathname.startsWith("/login") ||
    pathname === "/display-device-client-registration"
  ) {
    return null;
  }

  return (
    <nav className="flex items-center justify-between bg-primary h-20 px-16">
      <Image src="/adaura_logo.svg" alt="Adaura Logo" width={200} height={55} />
      <div className="flex items-center max-md:hidden overflow-hidden">
        <div className="flex flex-row gap-3 items-center">
          <Image src="/small_img_icon.svg" alt="" width={20} height={20} />
          <p>Companies</p>
          <div className=" h-10 ml-10  border-[0.5px] border-[#AAAAAA]"></div>
        </div>
        <div className="flex flex-row ml-12 gap-3 items-center">
          <Image src="/small_img_icon.svg" alt="" width={20} height={20} />
          <p>Devices</p>
          <div className=" h-10 ml-10  border-[0.5px] border-[#AAAAAA]"></div>
        </div>
        <div className="flex flex-row gap-3 ml-12 items-center">
          <Image src="/small_img_icon.svg" alt="" width={20} height={20} />
          <p>Users</p>
          <div className=" h-10 ml-10  border-[0.5px] border-[#AAAAAA]"></div>
        </div>
      </div>
      <div className="flex flex-row gap-7 items-center">
        <Image src="/bell_icon.svg" alt="Adaura Logo" width={25} height={25} />
        <Image
          src="/person_avatar.svg"
          alt="Adaura Logo"
          width={40}
          height={40}
        />
      </div>
    </nav>
  );
};

export default Navbar;
