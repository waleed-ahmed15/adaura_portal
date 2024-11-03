"use client";
import Breadcrumb from "@/app/components/BreadCrumbs";
import ProtectedRoute from "@/app/components/ProtectedRoutes";
import UploadAdDialog from "@/app/components/UploadAdDialog";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchDevices } from "../apiCilent/apiClient";

type Props = {};

const DeviceAdsManagementPage = (props: Props) => {
  const router = useRouter();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Ads Management", href: "/" },
  ];

  const [devices, setDevices] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const getDevices = async () => {
      try {
        const fetchedDevices = await fetchDevices();
        setDevices(fetchedDevices.data.results);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
    getDevices();
  }, []);

  const goToAdsManagementPage = (id: string) => {
    router.push(`/ads/${id}`);
  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <ProtectedRoute>
      <div className="w-full h-full bg-white px-10 py-10">
        <Breadcrumb items={breadcrumbItems} />
        <UploadAdDialog isOpen={isDialogOpen} onClose={closeDialog} />
        <div className="flex flex-row justify-between items-start">
          <p className="text-[#1A1A1A] my-3 text-h-large font-bold">
            Select Device
          </p>
        </div>
        <div className="overflow-x-auto mt-6 border-2 rounded-xl">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-white text-b-large font-bold">
                <th className="px-6 py-6">ID.</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Attached Ads</th>
   
                <th className="px-6 py-3">Current Status</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device:any, index) => (
                <tr
                  key={device.id}
                  onClick={() => goToAdsManagementPage(device.id)}
                  className={`cursor-pointer text-b-medium font-bold ${
                    index % 2 === 0 ? "bg-primary text-white" : "bg-white"
                  } border-t`}
                >
                  <td className="text-center">{device.id}</td>
                  <td className="text-center">{device.title}</td>
                  <td className="px-6 py-3 text-center">{device.deviceGeneratedId}</td>
                  <td className="text-center">{device?.adIds?.length ?? "-"}</td>
               
             
                  <td className="px-6 py-3 text-center">
                    <span
                      style={{ color: device.status }}
                      className="flex items-center gap-2 justify-center underline"
                    >
                      {device.status}
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
