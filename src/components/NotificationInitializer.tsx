"use client";
import { useEffect } from "react";
import { subscribeToPush } from "@/utils/pushSubscription";

export default function NotificationInitializer() {
  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("✅ Service Worker registered"))
        .catch((err) => console.error("❌ Service Worker registration failed:", err));
    } else {
      console.warn("Service workers are not supported in this browser.");
    }

    // Request notification permission
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission);
      });
    } else {
      console.warn("Notifications not supported in this browser.");
    }

    // Subscribe to push
    subscribeToPush()
      .then((sub) => {
        if (sub) {
          console.log("Push subscription active:", sub.endpoint);
        }
      })
      .catch((err) => console.error("Push subscription error:", err));
  }, []);

  return null;
}
