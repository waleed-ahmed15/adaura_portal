import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Set this in your .env file
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (email: string, password: string) => {
  return await apiClient.post("/login", { email, password });
};

export const fetchProducts = async () => {
  return await apiClient.get("/products");
};
export const signupUser = async (
  email: string,
  password: string,
  companyID: string
) => {
  return await apiClient.post("/signup", { email, password });
};

// Add more API calls as needed

export default apiClient;
