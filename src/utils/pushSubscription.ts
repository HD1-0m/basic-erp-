import { supabase } from "@/lib/supabase";

export async function subscribeToPush() {
  if (!("serviceWorker" in navigator)) return;

  const registration = await navigator.serviceWorker.ready;
  const existing = await registration.pushManager.getSubscription();
  if (existing) return existing;

  const key = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!key) {
    console.error("VAPID key missing");
    return;
  }

  const convertedKey = urlBase64ToUint8Array(key);

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedKey,
  });

  console.log("✅ Push subscription:", subscription);

  // Save subscription to Supabase
  const { data: user } = await supabase.auth.getUser();

  if (user?.user) {
    const { error } = await supabase.from("push_subscriptions").upsert({
      user_id: user.user.id,
      endpoint: subscription.endpoint,
      p256dh: subscription.toJSON().keys.p256dh,
      auth_key: subscription.toJSON().keys.auth,
    });

    if (error) console.error("Failed to save subscription:", error);
    else console.log("Subscription saved for user:", user.user.email);
  }

  return subscription;
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}
