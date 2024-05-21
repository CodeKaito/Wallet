import React, { createContext, useState, useEffect, useContext } from "react";

const DataContext = createContext();

const PaymentDataContextProvider = ({ children }) => {
  const [paymentData, setPaymentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/payments");
        if (response.ok) {
          const paymentData = await response.json();
          const transformedData = paymentData.map((item) => ({
            ...item,
            date: new Date(item.date),
          }));
          setPaymentData(transformedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
