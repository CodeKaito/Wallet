import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useUser } from "./UserContext";

const SavingDataContext = createContext();

export const SavingDataContextProvider = ({ children }) => {
  const { userData, isLoading } = useUser();
  const [savingData, setSavingData] = useState([]);

  const fetchSavingData = useCallback(async () => {
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
  }, [userData]);

  const refreshSavingData = useCallback(() => {
    fetchSavingData();
  }, [fetchSavingData]);

  useEffect(() => {
    if (!isLoading && userData) {
      fetchSavingData();
    }
  }, [fetchSavingData, isLoading, userData]);

  return (
    <SavingDataContext.Provider value={{ savingData, refreshSavingData }}>
      {children}
    </SavingDataContext.Provider>
  );
};

export const useSavingData = () => useContext(SavingDataContext);
