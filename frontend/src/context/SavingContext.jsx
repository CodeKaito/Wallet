import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";

const SavingDataContext = createContext();

export const SavingDataContextProvider = ({ children }) => {
  const [savingData, setSavingData] = useState([]);

  const fetchSavingData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/saving");
      if (response.ok) {
        const data = await response.json();
        setSavingData(data);
      } else {
        throw new Error("Failed to fetch saving data");
      }
    } catch (error) {
      console.error("Error fetching saving data:", error);
    }
  }, []);

  useEffect(() => {
    fetchSavingData();
  }, [fetchSavingData]);

  return (
    <SavingDataContext.Provider
      value={{ savingData, refreshSavingData: fetchSavingData }}
    >
      {children}
    </SavingDataContext.Provider>
  );
};

export const useSavingData = () => useContext(SavingDataContext);
