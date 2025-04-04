import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vox Market",
  description: "Voice-enabled e-marketplace platform",
  icons: {
    icon: "/vox-market (3).png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet" /> */}
      <body className={inter.className}>
      {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script> */}
      <Toaster position="top-right" />
        {children}
        </body>
    </html>
  );
}
