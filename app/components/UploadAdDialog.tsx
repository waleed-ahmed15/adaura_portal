import React, { useState, useEffect } from "react";
import ImageGallery from "./ImagesGallery";
import Image from "next/image";
import { ImagePreview } from "@/declarations";
import { Tooltip } from "@nextui-org/tooltip";
import { fetchDevices, uploadAd } from "../apiCilent/apiClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UploadAdDialogProps {
  isOpen: boolean;
  onClose: (success: any) => void;
}

const UploadAdDialog: React.FC<UploadAdDialogProps> = ({ isOpen, onClose }) => {
  const [selectedImages, setSelectedImages] = useState<ImagePreview[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [adsInfo, setAdsInfo] = useState<any>({
    deviceId: "",
    title: "",
    startDate: "",
    endDate: "",
    displayFrequency: [] 
  });
  const [devices, setDevices] = useState([]);

  const getDevices = async () => {
    try {
      const fetchedDevices = await fetchDevices();
      setDevices(fetchedDevices.data.results);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  useEffect(() => {

    getDevices();
  }, []);

  const handleDaySelection = (day: string) => {
    setAdsInfo((prevAdsInfo: any) => ({
      ...prevAdsInfo,
      displayFrequency: prevAdsInfo.displayFrequency.includes(day)
        ? prevAdsInfo.displayFrequency.filter((d: string) => d !== day)
        : [...prevAdsInfo.displayFrequency, day]
    }));
  };

  const clearModalData = () => {
    setSelectedImages([]);
    setAdsInfo({
      deviceId: "",
      title: "",
      startDate: "",
      endDate: "",
      displayFrequency: [],
    });

  }
  const onClickDeployAd = async () => {
    
    const formData = new FormData();

    // Append images as "files" array for backend processing
    selectedImages.forEach((image) => {
      formData.append("files", image.file); // Ensures "files" matches backend field
    });

    // Add other required fields from adsInfo
    formData.append("deviceId", adsInfo.deviceId);
    formData.append("title", adsInfo.title);
    formData.append("startDate", adsInfo.startDate);
    formData.append("endDate", adsInfo.endDate);
    formData.append("displayFrequency", JSON.stringify(adsInfo.displayFrequency));

    try {
      setIsFetching(true)
      const response = await uploadAd(formData);
      toast.success("Ad Uploaded Sucessfully");
      clearModalData()
      onClose(true)

    } catch (error) {
      toast.error("Ad Upload Error");

      console.error("An error occurred while uploading the ad", error);
    } finally {
      setIsFetching(false)
    }
  };

  const handleImagesChange = (images: ImagePreview[]) => {
    setSelectedImages(images);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 w-[780px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClickDeployAd();
          }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Add Video/Image</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <Image src={"/close_icon.svg"} alt="" width={30} height={30} />
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-black text-b-large font-medium  mb-2">
              Display *
            </label>
            <select
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              value={adsInfo.deviceId}
              required
              onChange={(e) =>
                setAdsInfo({ ...adsInfo, deviceId: e.target.value })
              }
            >
              <option value="" disabled>
                Select-Device
              </option>
              {devices.map((device) => (
                <option key={device.id} value={device.id}>
                  {device.title} | ID: {device.id}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6 border-2 rounded-lg p-4">
            <label className="block text-[#848484] font-medium mb-2">
              Ad Title
            </label>
            <input
              type="text"
              required
              placeholder="Ad Title"
              value={adsInfo.title}
              onChange={(e) =>
                setAdsInfo({ ...adsInfo, title: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
            <div className="flex space-x-4">
              <ImageGallery onImagesChange={handleImagesChange} />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-black font-semibold mb-2">
              Schedule Date
            </label>
            <input
              type="date"
              value={adsInfo.startDate}
              onChange={(e) =>
                setAdsInfo({ ...adsInfo, startDate: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
            <input
              type="date"
              value={adsInfo.endDate}
              onChange={(e) =>
                setAdsInfo({ ...adsInfo, endDate: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-black font-semibold mb-4">
              Frequency *
            </label>
            <div className="flex flex-wrap gap-2 md:w-7/12">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                (day) => (
                  <label key={day} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={adsInfo.displayFrequency.includes(day)}
                      onChange={() => handleDaySelection(day)}
                    />
                    <span>{day}</span>
                  </label>
                )
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Back
            </button>

            {isFetching ? (
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
                disabled={selectedImages.length === 0}
                className="px-4 py-2 bg-primary disabled:bg-gray-300 text-white rounded-md"
              >
                Deploy Ad
              </button>
            )}

          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadAdDialog;
