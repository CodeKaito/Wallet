import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useUser } from "./UserContext";

const DebtDataContext = createContext();

export const DebtDataContextProvider = ({ children }) => {
  const [debtData, setDebtData] = useState([]);
  const { userData, isLoading } = useUser();

  const fetchDebtData = useCallback(async () => {
    if (!userData) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/debt");
      if (response.ok) {
        const data = await response.json();
        const filteredData = data.filter(
          (debt) => debt.user._id === userData._id
        );
        setDebtData(filteredData);
      } else {
        throw new Error("Failed to fetch debt data");
      }
    } catch (error) {
      console.error("Error fetching debt data:", error);
    }
  }, [userData]);

  useEffect(() => {
    if (!isLoading && userData) {
      fetchDebtData();
    }
  }, [fetchDebtData, isLoading, userData]);

  return (
    <DebtDataContext.Provider
      value={{ debtData, refreshDebtData: fetchDebtData }}
    >
      {children}
    </DebtDataContext.Provider>
  );
};

export const useDebtData = () => useContext(DebtDataContext);
