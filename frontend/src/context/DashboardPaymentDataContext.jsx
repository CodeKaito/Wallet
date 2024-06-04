import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useUser } from "./UserContext";

const DataContext = createContext();

const DashboardPaymentDataContextProvider = ({ children }) => {
  const { userData, isLoading } = useUser();
  const [paymentData, setPaymentData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/payments");
      if (response.ok) {
        const data = await response.json();
        const paymentData = data.filter(
          (data) => data.user._id === userData._id
        );
        const transformedData = paymentData.map((item) => {
          const symbol = item.type === "Income" ? "+" : "-";
          return {
            ...item,
            date: item.date.split("T")[0],
            amount: `${symbol}${item.amount}€`,
          };
        });
        setPaymentData(transformedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [userData]);

  const refreshData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!isLoading && userData) {
      fetchData();
    }
  }, [fetchData, isLoading, userData]);

  return (
    <DataContext.Provider value={{ paymentData, refreshData }}>
      {children}
    </DataContext.Provider>
  );
};

export const usePaymentData = () => useContext(DataContext);

export { DashboardPaymentDataContextProvider };
