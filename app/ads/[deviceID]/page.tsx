"use client";
import Breadcrumb from "@/app/components/BreadCrumbs";
import ProtectedRoute from "@/app/components/ProtectedRoutes";
import UploadAdDialog from "@/app/components/UploadAdDialog";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchAds } from "../../apiCilent/apiClient";

type Props = {};
interface BreadcrumbItem {
  label: string | string[];
  href?: string;
}

const DeviceAdsManagementPage = (props: Props) => {
  const { deviceID } = useParams();
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },

    { label: "Ads Management", href: "/ads" },
    { label: "Devices", href: "/ads" },
    { label: deviceID, href: "/" },
  ];
  const getDevices = async () => {
    try {
      const fetchedDevices = await fetchAds();
      setDevices(fetchedDevices.data.results);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };
  useEffect(() => {

    getDevices();
  }, []);

  const [devices, setDevices] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = (success:any) => {
    setIsDialogOpen(false)
    if(success) {
      getDevices()
    }
  };
  return (
    <ProtectedRoute>
      <div className="w-full h-full bg-white px-10 py-10">
        <Breadcrumb items={breadcrumbItems} />

        {/* <h1>Device Ads Management Page</h1> */}
        {/* <p>Device ID: {deviceID}</p> */}
        <UploadAdDialog isOpen={isDialogOpen} onClose={closeDialog} />
        <div className="flex flex-row justify-between items-start">
          <p className="text-[#1A1A1A] my-3 text-h-large font-bold">
            Ads Management
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
                <th className="px-6 py-6">ID.</th>
                <th className="px-6 py-3">Preview</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Display Frequency</th>
                <th className="px-6 py-3">Start Date</th>
                <th className="px-6 py-3">End Date</th>
                <th className="px-6 py-3">Current Status</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((ad, index) => (
                <tr
                  key={index}
                  className={` text-b-medium font-bold ${
                    index % 2 === 0 ? "bg-primary text-white " : "bg-white"
                  } border-t`}
                >
                  <td className=" text-center ">{ad.id}</td>

                  <td className="items-center overflow-x-auto flex justify-center py-3">
                    {ad.content.map((content) => (
                      <Image
                        src={content.url}
                        width={1000}
                        height={1000}
                        alt=""
                        className="w-32 h-20 rounded-small"
                      />
                    ))}

                    {/* <div className=" w-32 h-20 bg-red-600"></div> */}
                  </td>
                  <td className="px-6 py-3 text-center ">{ad.title}</td>
                  <td className="px-6 py-3 text-center ">{ad.displayFrequency}</td>
                  <td className="px-6 py-3 text-center ">{ad.startDate}</td>
                  <td className="px-6 py-3 text-center ">{ad.endDate}</td>


                  <td className="px-6 py-3 text-center   cursor-pointer">
                    <span className="flex items-center gap-2 justify-center underline">
                      {ad.status}
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
