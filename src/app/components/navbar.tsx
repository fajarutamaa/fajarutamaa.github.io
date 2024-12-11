"use client";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      className="container max-w-[680px] mt-6 lg:mt-10 flex flex-row items-center gap-4 justify-between animate-fadeIn"
      style={{
        animationDelay: "100ms",
        animationFillMode: "both",
      }}
    >
      <div className="flex flex-row items-center tracking-tight gap-4 md:gap-6"></div>
      <div className="flex flex-row items-center gap-4 md:gap-6">
        {isClient ? (
          <button
            type="button"
            onClick={() => {
              setTheme(theme === "light" ? "dark" : "light");
            }}
            className="transition-all transform hover:opacity-70 hover:scale-110 duration-200 ease-out"
          >
            {theme === "dark" ? (
              <SunIcon
                size={16}
                className="transition-transform duration-300 rotate-0 hover:rotate-90"
              />
            ) : (
              <MoonIcon
                size={16}
                className="transition-transform duration-300 rotate-0 hover:rotate-90"
              />
            )}
          </button>
        ) : null}
      </div>
    </div>
  );
};
