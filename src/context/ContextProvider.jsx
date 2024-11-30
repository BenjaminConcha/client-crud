import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const addData = createContext("");
// eslint-disable-next-line react-refresh/only-export-components
export const updateData = createContext("");

// eslint-disable-next-line react-refresh/only-export-components
export const deleteData = createContext("");

// eslint-disable-next-line react/prop-types
const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState("");
  const [upData, setUpData] = useState("");
  const [delData, setDelData] = useState("");

  return (
    <addData.Provider value={{ userData, setUserData }}>
      <updateData.Provider value={{ upData, setUpData }}>
        <deleteData.Provider value={{ delData, setDelData }}>
          {children}
        </deleteData.Provider>
      </updateData.Provider>
    </addData.Provider>
  );
};

export default ContextProvider;
