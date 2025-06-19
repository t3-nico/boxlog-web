"use client"
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.className = theme;
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="px-4 py-2 rounded bg-zinc-800 text-white dark:bg-zinc-200 dark:text-black border border-zinc-700 dark:border-zinc-300"
      >
        {theme === "dark" ? "ライトモード" : "ダークモード"}
      </button>
    </div>
  );
}