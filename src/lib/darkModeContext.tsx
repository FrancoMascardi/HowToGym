import React, { ReactNode, useState } from "react";

export const DarkModeContext = React.createContext({
  setDarkMode: (value: boolean) => {},
  darkMode: false,
});
export const DarkModeContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <DarkModeContext.Provider
      value={
        { darkMode, setDarkMode } as { darkMode: boolean; setDarkMode: any }
      }
    >
      {children}
    </DarkModeContext.Provider>
  );
};
