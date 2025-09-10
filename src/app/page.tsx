"use client";

import { useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`min-h-screen bg-white flex flex-col items-center ${inter.className}`}>

      {/* Logo */}
      <div className="mt-auto mb-auto flex flex-col items-center">
        <img
          src="/img/assets/logo.png"
          alt="Logo"
          className="w-[15vh] h-[15vh] object-contain"
        />
        <h1 className="font-bold text-lg mb-auto text-center mt-4 text-black">
        RAMPCHECK KEMENHUB
        </h1>
      </div>

      {/* Form box */}
      <div className="bg-purple-900 w-full flex flex-col justify-start rounded-t-3xl px-6 pt-12 pb-8 text-white h-[70vh] max-w-[414px]">
      <h2 className="text-center font-semibold text-lg mb-6">
        Masuk Dengan Akun Anda
      </h2>

      <label className="block mb-3 text-sm font-medium " htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        placeholder="Masukkan Email"
        className="w-full rounded-md px-3 py-2 mb-5 text-gray-700 bg-white"
      />

      <label className="block mb-3 text-sm font-medium" htmlFor="password">
        Password
      </label>
      <div className="relative">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Masukkan Password"
          className="w-full rounded-md px-3 py-2 text-gray-700 pr-10 bg-white" 
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 text-gray-600"
          aria-label="Toggle Password Visibility"
        >
          {showPassword ? (
            // Icon mata terbuka
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
              />
            </svg>
          ) : (
            // Icon mata tertutup (mata dicoret)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.478-10-10a9.965 9.965 0 011.175-4.425M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3l18 18"
              />
            </svg>
          )}
        </button>
      </div>

      <button
        className="mt-8 bg-yellow-600 w-full py-3 rounded-md font-bold text-white hover:bg-yellow-700 transition"
        type="button"
      >
        MASUK
      </button>
    </div>

    </div>
  );
}
