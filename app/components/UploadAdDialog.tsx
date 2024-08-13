import React, { useState } from "react";
import ImageGallery from "./ImagesGallery";
import Image from "next/image";
import { ImagePreview } from "@/declarations";

interface UploadAdDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadAdDialog: React.FC<UploadAdDialogProps> = ({ isOpen, onClose }) => {
  const [selectedImages, setSelectedImages] = useState<ImagePreview[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const [isScheduled, setIsScheduled] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const handleDaySelection = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };
  const uploadAd = async () => {
    const formData = new FormData();

    // Append the images
    selectedImages.forEach((image) => {
      formData.append("images", image.file); // "images" should match the backend API's expected key
    });

    // Append other form fields
    formData.append("device", selectedDevice);
    formData.append("isScheduled", isScheduled ? "true" : "false");
    formData.append("date", selectedDate);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("days", JSON.stringify(selectedDays)); // Convert array to JSON string

    console.log(formData);
    // try {
    //   const response = await fetch("/api/upload", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   if (response.ok) {
    //     console.log("Ad uploaded successfully!");
    //   } else {
    //     console.error("Failed to upload ad");
    //   }
    // } catch (error) {
    //   console.error("An error occurred while uploading the ad", error);
    // }
  };

  const handleImagesChange = (images: ImagePreview[]) => {
    setSelectedImages(images);
    console.log("Updated images:", images); // This logs the updated list of images
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 w-[780px]">
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevents the default form submission behavior
            uploadAd(); // Call the upload function
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
              value={selectedDevice}
              required
              onChange={(e) => setSelectedDevice(e.target.value)}
            >
              <option value="" disabled>
                Select-Device
              </option>
              <option>Device - 1</option>
              <option>Device - 2</option>
              <option>Device - 3</option>
              <option>Device - 4</option>
              <option>Device - 5</option>
            </select>
          </div>

          <div className="mb-6 border-2 rounded-lg p-4">
            <div className="flex flex-row items-center pb-2 gap-3">
              <label className="block text-[#848484] font-medium ">
                PREVIEW
              </label>
              <span
                className={`text-b-small text-red-600  ${
                  selectedImages.length == 0 ? "block" : "hidden"
                }`}
              >
                (Please Add Atleast 1 Image)
              </span>
            </div>

            <div className="flex space-x-4">
              <ImageGallery onImagesChange={handleImagesChange} />
            </div>
          </div>

          <div className="mb-6 flex gap-4">
            <span className="text-b-large font-medium text-black">Schedule</span>
            <label className="inline-flex items-center mb-5 cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isScheduled}
                onChange={() => setIsScheduled(!isScheduled)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="mb-6 flex md:flex-row flex-col items-end space-x-4">
            <div className="flex-col w-full">
              <label className="block text-black font-semibold mb-2">
                Date *
              </label>
              <div className="flex w-full flex-col md:flex-row gap-3 md:items-center md:gap-10">
                <input
                  type="date"
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
                <p className="block text-gray-700 font-medium mb-2">From</p>
                <input
                  type="time"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <label className="block text-gray-700 font-medium mb-2">
                  To
                </label>
                <input
                  type="time"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-black font-semibold mb-4">
              Frequency *
            </label>
            <div className="flex flex-wrap gap-2 md:w-7/12">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <label key={day} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedDays.includes(day)}
                    onChange={() => handleDaySelection(day)}
                  />
                  <span>{day}</span>
                </label>
              ))}
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
            <button
              type="submit"
              disabled={selectedImages.length == 0}
              className="px-4 py-2 bg-primary disabled:bg-gray-300 text-white rounded-md"
            >
              Deploy Ad
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadAdDialog;
