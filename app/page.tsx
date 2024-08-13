import Image from "next/image";
import LoginPage from "./login/page";
import ProtectedRoute from "./components/ProtectedRoutes";

export default function Home() {
  return (
    <ProtectedRoute>
      <div>home</div>
    </ProtectedRoute>
  );
}
