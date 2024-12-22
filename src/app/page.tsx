"use client";
import { useEffect } from "react";

export default function Home() {
  const router = useRoute();

  useEffect(() => {
    router.push("/home");
  }, [router]);

  return null;
}
