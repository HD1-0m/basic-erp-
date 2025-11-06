"use client";

import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { subscribeToPush } from "@/utils/pushSubscription";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ✅ Register Service Worker & Push Notifications
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("✅ Service Worker registered"))
        .catch((err) => console.error("❌ Service Worker failed:", err));
    }

    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission);
      });
    }

    subscribeToPush().then((sub) => {
      if (sub) {
        console.log("Push subscription active:", sub.endpoint);
        // 🧠 TODO: Save subscription info to Supabase for this user
      }
    });
  }, []);

  return (
    <div className="h-screen flex">
      {/* LEFT: SIDEBAR */}
      <div
        className="
          w-[210px]
          h-full
          bg-white
          flex flex-col
          items-start
          p-5
          border-r border-gray-100
          transition-all duration-300
          hidden lg:flex
        "
      >
        {/* LOGO + SITE NAME */}
        <Link href="/" className="flex items-center gap-3 mb-8 w-full">
          <Image
            src="/logo.png"
            alt="BasicVmedulife Logo"
            width={36}
            height={36}
            priority
          />
          <span className="font-bold text-lg text-gray-900">
            BasicVmedulife
          </span>
        </Link>

        {/* Menu */}
        <div className="w-full mt-4">
          <Menu />
        </div>
      </div>

      {/* RIGHT: MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full">
        {/* Navbar */}
        <div className="flex-shrink-0">
          <Navbar />
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-auto p-4 bg-[#F7F8FA] shadow-inner shadow-gray-300">
          {children}
        </div>
      </div>

      {/* 🔔 Toaster for pop-up alerts */}
      <Toaster position="top-right" />
    </div>
  );
}
