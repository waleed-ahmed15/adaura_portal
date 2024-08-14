"use client";
import Link from "next/link";
import Breadcrumb from "./components/BreadCrumbs";
import ProtectedRoute from "./components/ProtectedRoutes";
import { useAuth } from "./context/AuthContext";
export default function Home() {
  const { logoutUser, isAuthenticated } = useAuth();
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Devices", href: "#" },
  ];

  // Dummy Data
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

  return (
    <ProtectedRoute>
      <div className="flex flex-col w-full h-full bg-white px-10 py-10">
        <Breadcrumb items={breadcrumbItems} />
        <div onClick={logoutUser}>logout</div>

        <p className="text-[#1A1A1A] my-3 text-h-large font-bold">Devices</p>

        <div className="flex items-center justify-end gap-5 mt-5">
          <div className="flex  items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#1BD27E] -mt-1" />
            <p className="text-black text-b-medium ">All good</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 rounded-full bg-[#EDAD23] "></div>
            <p className="text-b-small text-black">Issue</p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-6 border-2 rounded-xl">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-white text-b-medium font-bold">
                <th className="px-6 py-3">No.</th>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Running Ads</th>
                <th className="px-6 py-3">Device Status</th>
                <th className="px-6 py-3">Organization</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device, index) => (
                <tr
                  key={index}
                  className={`text-b-medium font-bold ${
                    index % 2 === 0 ? "bg-primary text-white " : "bg-white"
                  } border-t`}
                >
                  <td className="px-6 py-3 text-center ">{device.no}</td>
                  <td className="px-6 py-3 text-center ">{device.id}</td>
                  <td
                    className="px-6 py-3 text-center justify-center flex items-center gap-2"
                    title={device.runningAds} // Tooltip showing the full text
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
                  </td>
                  <td className="px-6 py-3 text-center   cursor-pointer">
                    <Link href={`/ads/${device.id}`}>
                      <span className="flex items-center gap-2 justify-center underline">
                        <img
                          src={`${
                            index % 2 === 0
                              ? "/history_icon.svg"
                              : "/history_icon_black.svg"
                          } `}
                          alt="History"
                          className="w-4 h-4"
                        />
                        History
                      </span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
}
