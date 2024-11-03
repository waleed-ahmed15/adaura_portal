"use client";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Set this in your .env file
  headers: {
    "Content-Type": "application/json",
  },
});

// Create an interceptor to add the Authorization header dynamically
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

const multipartAuthApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Set this in your .env file
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Add Authorization header for multipart requests as well
multipartAuthApiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

const saveToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", token);
  }
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
  return await apiClient.get("/devices");
};

export const fetchAds = async () => {
  return await apiClient.get("/ads");
};

export const uploadAd = async (reqBody: any) => {
  return await multipartAuthApiClient.post("/ads", reqBody);
};

// Add more API calls as needed

export default apiClient;
