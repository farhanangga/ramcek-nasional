import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ 
  subsets: ["latin"], 
  weight: ["500"]  // tambahkan weight di sini
});

export const metadata = {
  title: "Rampcheck",
  description: "Login Page",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
