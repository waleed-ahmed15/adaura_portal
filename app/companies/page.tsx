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
    { label: "Companies", href: "/" },
  ];
  const companies = [
    {
      no: 1,
      name: "Company A",
      email: "companya@example.com",
      branches: 5,
      devices: 100,
    },
    {
      no: 2,
      name: "Company B",
      email: "companyb@example.com",
      branches: 3,
      devices: 50,
    },
    {
      no: 3,
      name: "Company C",
      email: "companyc@example.com",
      branches: 10,
      devices: 200,
    },
    // Add more companies as needed
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
        <UploadAdDialog isOpen={isDialogOpen} onClose={closeDialog} />
        <div className="flex flex-row justify-between items-start">
          <p className="text-[#1A1A1A] my-3 text-h-large font-bold">
            Companies
          </p>
        </div>
        <div className="overflow-x-auto mt-6 border-2 rounded-xl">
          <table className="min-w-full border-collapse">
            <thead className="">
              <tr className="bg-white text-b-large font-bold ">
                <th className="px-6 py-6">No.</th>
                <th className="px-6 py-3">Companies</th>
                <th className="px-6 py-3">Email Address</th>
                <th className="px-6 py-3">Branches</th>
                <th className="px-6 py-3">Devices</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr
                  key={index}
                  className={` text-b-medium font-bold ${
                    index % 2 === 0
                      ? "bg-primary bg-opacity-80 text-white "
                      : "bg-white"
                  } border-t`}
                >
                  <td className=" text-center ">{company.no}</td>

                  <td className="px-6 py-3 text-center ">{company.name}</td>
                  <td className="px-6 py-3 text-center ">{company.email}</td>
                  <td className="px-6 py-3 text-center ">{company.branches}</td>
                  <td className="px-6 py-3 text-center ">{company.devices}</td>
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
