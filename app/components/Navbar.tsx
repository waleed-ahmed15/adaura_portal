"use client";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import { LogoutIcon } from "@heroicons/react/solid";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { Tooltip } from "@nextui-org/tooltip";
type Props = {};

const Navbar = (props: Props) => {
  const pathname = usePathname();
  const { logoutUser } = useAuth();

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
      <div className="flex items-center max-md:hidden overflow-hidden text-white">
      <Link href={`/companies`}>
        <div className="flex flex-row gap-3 items-center">
          <Image src="/small_img_icon.svg" alt="" width={20} height={20} />
          <p>Companies</p>
          <div className=" h-10 ml-10  border-[0.5px] border-[#AAAAAA]"></div>
        </div>
        </Link>
        <Link href={`/`}>
        <div className="flex flex-row ml-12 gap-3 items-center">
          <Image src="/small_img_icon.svg" alt="" width={20} height={20} />
          <p>Devices</p>
          <div className=" h-10 ml-10  border-[0.5px] border-[#AAAAAA]"></div>
        </div>
        </Link>
        <Link href={`/users`}>
        <div className="flex flex-row gap-3 ml-12 items-center">
          <Image src="/small_img_icon.svg" alt="" width={20} height={20} />
          <p>Users</p>
          <div className=" h-10 ml-10  border-[0.5px] border-[#AAAAAA]"></div>
        </div>
        </Link>
        <Link href={`/ads`}>
        <div className="flex flex-row gap-3 ml-12 items-center">
          <Image src="/small_img_icon.svg" alt="" width={20} height={20} />
          <p>Ads Management</p>
        </div>
        </Link>
      </div>
      <div className="flex flex-row gap-7 items-center">
        <Image src="/bell_icon.svg" alt="Adaura Logo" width={25} height={25} />
        <Image
          src="/person_avatar.svg"
          alt="Adaura Logo"
          width={40}
          height={40}
        />
        <LogoutIcon
          className="h-10 w-10 text-white cursor-pointer"
          onClick={() => logoutUser()}
        />
      </div>
    </nav>
  );
};

export default Navbar;
