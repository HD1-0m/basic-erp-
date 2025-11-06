"use client";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";

export default function TestPage() {
  useEffect(() => {
    async function fetchTest() {
      const { data, error } = await supabase.from("profiles").select("*");
      console.log("Data:", data, "Error:", error);
    }
    fetchTest();
  }, []);

  return <h1>Testing Supabase Connection...</h1>;
}
