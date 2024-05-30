import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";

const DebtDataContext = createContext();

export const DebtDataContextProvider = ({ children }) => {
  const [debtData, setDebtData] = useState([]);

  const fetchDebtData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/debt");
      if (response.ok) {
        const data = await response.json();
        setDebtData(data);
      } else {
        throw new Error("Failed to fetch debt data");
      }
    } catch (error) {
      console.error("Error fetching debt data:", error);
    }
  }, []);

  useEffect(() => {
    fetchDebtData();
  }, [fetchDebtData]);

  return (
    <DebtDataContext.Provider
      value={{ debtData, refreshDebtData: fetchDebtData }}
    >
      {children}
    </DebtDataContext.Provider>
  );
};

export const useDebtData = () => useContext(DebtDataContext);
