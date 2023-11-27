import { DarkModeContext } from "@/lib/darkModeContext";
import React, { useContext } from "react";

export const Settings = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  return (
    <div className="bg-gradient-to-b from-[#F5F5F5] to-[#D9D9D9] z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-72 flex flex-col items-center rounded-lg gap-8">
      <h3 className="font-bold text-3xl mt-3">Opciones</h3>
      <div className="flex items-center justify-center gap-2">
        <img
          src="/night-mode.png"
          alt="night-mode"
          width={24}
          height={20}
          className="h-8 w-8"
        />
        <div className="font-bold">Modo oscuro</div>
        <label className="inline-flex relative items-center mr-5 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={darkMode}
            readOnly
          />
          <div
            onClick={() => {
              setDarkMode(!darkMode);
              document.documentElement.className = !darkMode ? "dark" : "";
            }}
            className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
          ></div>
        </label>
      </div>
    </div>
  );
};
