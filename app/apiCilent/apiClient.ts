import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Set this in your .env file
  headers: {
    "Content-Type": "application/json",
  },
});

const authApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Set this in your .env file
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    "Content-Type": "application/json",
  },
});

const multipartAuthApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Set this in your .env file

  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    "Content-Type": "multipart/form-data",
  },
});

const saveToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const login = async (email: string, password: string) => {
  const response = await apiClient.post("/auth/login", { email, password });
  saveToken(response.data.tokens.access.token);
  return response;
};

export const signupUser = async (
  email: string,
  password: string,
  companyID: string
) => {
  return await apiClient.post("/signup", { email, password });
};

export const fetchDevices = async () => {
  return await authApiClient.get("/devices");
};

export const fetchAds = async () => {
  return await authApiClient.get("/ads");
};

export const uploadAd = async (reqBody: any) => {
  return await multipartAuthApiClient.post("/ads", reqBody);
};

// Add more API calls as needed

export default apiClient;
