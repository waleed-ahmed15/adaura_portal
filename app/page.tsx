"use client";
import Image from "next/image";
import LoginPage from "./login/page";
import ProtectedRoute from "./components/ProtectedRoutes";
import { useAuth } from "./context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const { toggleAuth, logoutUser, isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div className="flex flex-col">
        <p>Home</p>
        <div className="border-2 bg-green-600">{` this is ${isAuthenticated}`}</div>
        <div
          onClick={() => {
            router.push("/devices");
          }}
        >
          Go to DevicesPage
        </div>
        <div onClick={logoutUser}>logout</div>
      </div>
    </ProtectedRoute>
  );
}
