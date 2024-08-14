"use client";
import Breadcrumb from "@/app/components/BreadCrumbs";
import ProtectedRoute from "@/app/components/ProtectedRoutes";
import UploadAdDialog from "@/app/components/UploadAdDialog";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

type Props = {};

const DeviceAdsManagementPage = (props: Props) => {
  const { deviceID } = useParams();
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Users", href: "/" },
  ];
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      phoneNumber: "123-456-7890",
      organization: "Company A",
      role: "Manager",
      actions: "Edit | Delete",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      phoneNumber: "098-765-4321",
      organization: "Company B",
      role: "Developer",
      actions: "Edit | Delete",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alicejohnson@example.com",
      phoneNumber: "555-123-4567",
      organization: "Company C",
      role: "Designer",
      actions: "Edit | Delete",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bobbrown@example.com",
      phoneNumber: "444-555-6666",
      organization: "Company D",
      role: "Analyst",
      actions: "Edit | Delete",
    },
    // Add more users as needed
  ];
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  return (
    <ProtectedRoute>
      <div className="w-full h-full bg-white px-10 py-10">
        <Breadcrumb items={breadcrumbItems} />

        {/* <h1>Device Ads Management Page</h1> */}
        {/* <p>Device ID: {deviceID}</p> */}
        <div className="flex flex-row justify-between items-start">
          <p className="text-[#1A1A1A] my-3 text-h-large font-bold">Users</p>
          <button
            className="text-center bg-primary px-10 py-3 flex items-center rounded-xl text-white"
            onClick={() => {
              console.log("deploy AD clicked");
            }}
          >
            <span className="mr-2 text-h-small">+</span> <span>ADD USER</span>
          </button>
        </div>
        <div className="overflow-x-auto mt-6 border-2 rounded-xl">
          <table className="min-w-full border-collapse">
            <thead className="">
              <tr className="bg-white text-b-large font-bold ">
                <th className="px-6 py-6">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email Address</th>
                <th className="px-6 py-3">Phone Number</th>
                <th className="px-6 py-3">Organization</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className={` text-b-medium font-bold ${
                    index % 2 === 0 ? "bg-primary text-white " : "bg-white"
                  } border-t`}
                >
                  <td className=" text-center ">{user.id}</td>
                  <td className="px-6 py-3 text-center ">{user.name}</td>
                  <td className="px-6 py-3 text-center ">{user.email}</td>
                  <td className="px-6 py-3 text-center ">{user.phoneNumber}</td>
                  <td className="px-6 py-3 text-center ">
                    {user.organization}
                  </td>
                  <td className="px-6 py-3 text-center ">{user.role}</td>
                  <td className="px-6 py-3 text-center items-center flex justify-center   cursor-pointer">
                    <button className=" bg-white  text-black flex gap-4 py-2 px-7 border-2 border-[#64748B] rounded-lg shadow-sm text-b-medium font-semibold ">
                      <Image
                        src="/settings_icon.svg"
                        alt=""
                        width={20}
                        height={20}
                      />
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DeviceAdsManagementPage;
