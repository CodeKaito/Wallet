import React, { createContext, useState, useEffect, useContext } from "react";

const SavingDataContext = createContext();

export const SavingDataContextProvider = ({ children }) => {
  const [savingData, setSavingData] = useState([]);

  const fetchSavingData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/saving");
      if (response.ok) {
        const savingData = await response.json();
        setSavingData(savingData);
      } else {
        throw new Error("Failed to fetch saving data");
      }
    } catch (error) {
      console.error("Error fetching saving data:", error);
    }
  };

  useEffect(() => {
    fetchSavingData();
  }, []);

  return (
    <SavingDataContext.Provider value={{ savingData }}>
      {children}
    </SavingDataContext.Provider>
  );
};

export const useSavingData = () => useContext(SavingDataContext);
