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
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!userData) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/payments");
      if (response.ok) {
        const data = await response.json();
        const filteredData = data.filter(
          (data) => data.user._id === userData._id
        );
        console.log(filteredData);
        const transformedData = filteredData.map((item) => ({
          ...item,
          date: new Date(item.date),
        }));
        setIsLoading(false);
        setPaymentData(transformedData);
      } else {
        setIsLoading(false);
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userData]);

  useEffect(() => {
    if (!userLoading && userData) {
      fetchData();
    }
  }, [fetchData, userLoading, userData]);

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
