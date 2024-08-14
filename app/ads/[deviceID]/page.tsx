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
    { label: "Devices", href: "/" },

    { label: "Ads Management", href: "/ads" },
    { label: "History", href: "#" },
  ];
  const adsHistory = [
    {
      no: "01",
      id: "20109",
      preview: "https://www.simplilearn.com/ice9/free_resources_article_thumb/Coca_Cola_Marketing_Strategy_2022.jpg", // Placeholder image
      created: "2024-08-01",
      lastUpdated: "2024-08-07",
      duration: "7 days",
      currentStatus: "Active",
      statusColor: "#1BD27E", // Green
    },
    {
      no: "02",
      id: "20110",
      preview: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f4faf829500323.55f69c7711cc3.jpg", // Placeholder image
      created: "2024-08-03",
      lastUpdated: "2024-08-08",
      duration: "5 days",
      currentStatus: "Inactive",
      statusColor: "#E74C3C", // Red
    },
    {
      no: "03",
      id: "20110",
      preview: "https://assets-mr-mag-com.s3.amazonaws.com/2018/11/Jordan-Brand-Logo-1.jpg", // Placeholder image
      created: "2024-08-03",
      lastUpdated: "2024-08-08",
      duration: "5 days",
      currentStatus: "Inactive",
      statusColor: "#E74C3C", // Red
    },
  ];
  const devices = [
    {
      no: "01",
      id: "20109",
      runningAds: "10/10",
      adsStatus: "All good",
      adsStatusColor: "#1BD27E", // Green
      deviceStatus: "Online",
      deviceStatusColor: "#1BD27E", // Green
      organization:
        "Organization 1 asd sa dsad sa  as dsa dsa sa dsa  ad as dsa sa dsa sa dsd",
    },
    {
      no: "02",
      id: "20100",
      runningAds: "9/10",
      adsStatus: "Issue",
      adsStatusColor: "#EDAD23", // Orange
      deviceStatus: "Offline",
      deviceStatusColor: "#E74C3C", // Red
      organization: "Organization 2",
    },
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
            History
          </p>
          <button
            className="text-center bg-primary px-10 py-3 flex items-center rounded-xl text-white"
            onClick={() => {
              console.log("deploy AD clicked");
              setIsDialogOpen(true);
            }}
          >
            <span className="mr-2 text-h-small">+</span> <span>DEPLOY AD</span>
          </button>
        </div>
        <div className="overflow-x-auto mt-6 border-2 rounded-xl">
          <table className="min-w-full border-collapse">
            <thead className="">
              <tr className="bg-white text-b-large font-bold ">
                <th className="px-6 py-6">No.</th>
                <th className="px-6 py-3">Preview</th>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Created</th>
                <th className="px-6 py-3">Last Updated</th>
                <th className="px-6 py-3">Duration</th>
                <th className="px-6 py-3">CurrentStatus</th>
              </tr>
            </thead>
            <tbody>
              {adsHistory.map((ad, index) => (
                <tr
                  key={index}
                  className={` text-b-medium font-bold ${
                    index % 2 === 0 ? "bg-primary text-white " : "bg-white"
                  } border-t`}
                >
                  <td className=" text-center ">{ad.no}</td>

                  <td className="items-center  flex justify-center py-3">
                    <Image
                      src={ad.preview}
                      width={1000}
                      height={1000}
                      alt=""
                      className="w-32 h-20 rounded-small"
                    />
                    {/* <div className=" w-32 h-20 bg-red-600"></div> */}
                  </td>
                  <td className="px-6 py-3 text-center ">{ad.id}</td>
                  <td className="px-6 py-3 text-center ">{ad.created}</td>
                  <td className="px-6 py-3 text-center ">{ad.lastUpdated}</td>
                  <td className="px-6 py-3 text-center ">{ad.duration}</td>

                  {/* </td>
                  <td
                    className="px-6 py-3 text-center justify-center flex items-center gap-2"
                    title={ad.runningAds} // Tooltip showing the full text
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: device.adsStatusColor }}
                    ></span>
                    <span className=" truncate max-w-[100px]">
                      {device.runningAds}
                    </span>
                  </td>
                  <td
                    className="px-6 py-3 text-center  cursor-pointer"
                    title={device.deviceStatus} // Tooltip showing the full text
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: device.deviceStatusColor }}
                      ></span>
                      <span className="flex items-center gap-2 justify-center truncate max-w-[100px]">
                        {device.deviceStatus}
                      </span>
                    </div>
                  </td>
                  <td
                    className="px-6 py-3 text-center  border-2 "
                    title={device.organization} // Tooltip showing the full text
                  >
                    <div className="flex items-center justify-center">
                      <p className="truncate max-w-[200px] text-center">
                        {device.organization}
                      </p>
                    </div>
                  </td> */}
                  <td className="px-6 py-3 text-center   cursor-pointer">
                    <span className="flex items-center gap-2 justify-center underline">
                      {ad.currentStatus}
                    </span>
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
