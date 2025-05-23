import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ["latin"] });

const poppins_init = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Adaura",
  description: "Adaura Digital Signage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins_init.className}>

        <AuthProvider>
          <Navbar />
          <ToastContainer />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
