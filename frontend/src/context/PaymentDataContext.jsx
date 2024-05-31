import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useUser } from "./UserContext";

const DataContext = createContext();

const PaymentDataContextProvider = ({ children }) => {
  const { userData, isLoading } = useUser();
  const [paymentData, setPaymentData] = useState([]);

  const fetchData = useCallback(async () => {
    if (!userData) {
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/payments");
      if (response.ok) {
        const data = await response.json();
        const paymentData = data.filter(
          (data) => data.user._id === userData._id
        );
        const transformedData = paymentData.map((item) => ({
          ...item,
          date: new Date(item.date),
          amount: `€${item.amount}`,
        }));
        setPaymentData(transformedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [userData]);

  useEffect(() => {
    if (!isLoading && userData) {
      fetchData();
    }
  }, [fetchData, isLoading, userData]);

  const updatePaymentData = async (newPaymentData) => {
    try {
      setPaymentData((prevData) => [...prevData, newPaymentData]);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <DataContext.Provider value={{ paymentData, updatePaymentData }}>
      {children}
    </DataContext.Provider>
  );
};

export const usePaymentData = () => useContext(DataContext);

export { PaymentDataContextProvider };
