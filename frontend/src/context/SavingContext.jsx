import React, { createContext, useState, useEffect, useContext } from "react";
import { useUser } from "./UserContext";

const SavingDataContext = createContext();

export const SavingDataContextProvider = ({ children }) => {
  const { userData } = useUser();
  const [savingData, setSavingData] = useState([]);

  useEffect(() => {
    const fetchSavingData = async () => {
      if (!userData) {
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/saving");
        if (response.ok) {
          const data = await response.json();
          const filteredData = data.filter((data) => {
            return data.user._id === userData._id;
          });
          setSavingData(filteredData);
        } else {
          throw new Error("Failed to fetch saving data");
        }
      } catch (error) {
        console.error("Error fetching saving data:", error);
      }
    };

    fetchSavingData();
  }, [userData]);

  return (
    <SavingDataContext.Provider value={{ savingData }}>
      {children}
    </SavingDataContext.Provider>
  );
};

export const useSavingData = () => useContext(SavingDataContext);
