import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useUser } from "./UserContext";
import CustomLoader from "../utils/CustomLoader";

const DataContext = createContext();

const PaymentDataContextProvider = ({ children }) => {
  const { userData, isLoading: userLoading } = useUser();
  const [paymentData, setPaymentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!userData) {
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/payments");
      if (response.ok) {
        const data = await response.json();
        const filteredData = data.filter(
          (data) => data.user._id === userData._id
        );
        const transformedData = filteredData.map((item) => ({
          ...item,
          date: new Date(item.date),
        }));
        setPaymentData(transformedData);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }, [userData]);

  useEffect(() => {
    if (!userLoading && userData && isLoading) {
      fetchData();
    }
  }, [fetchData, userLoading, userData, isLoading]);

  const updatePaymentData = async (newPaymentData) => {
    try {
      setPaymentData((prevData) => [...prevData, newPaymentData]);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  if (isLoading || userLoading) {
    return <CustomLoader />;
  }

  return (
    <DataContext.Provider value={{ paymentData, updatePaymentData }}>
      {children}
    </DataContext.Provider>
  );
};

export const usePaymentData = () => useContext(DataContext);

export { PaymentDataContextProvider };
