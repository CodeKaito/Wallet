import React, { createContext, useState, useEffect, useContext } from "react";

const DataContext = createContext();

const DashboardPaymentDataContextProvider = ({ children }) => {
  const [paymentData, setPaymentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/payments");
        if (response.ok) {
          const paymentData = await response.json();
          const transformedData = paymentData.map((item) => {
            const symbol = item.type === "Income" ? "+" : "-";
            return {
              ...item,
              date: item.date.split("T")[0],
              amount: `${symbol}€${item.amount}`,
            };
          });
          setPaymentData(transformedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ paymentData }}>
      {children}
    </DataContext.Provider>
  );
};

export const usePaymentData = () => useContext(DataContext);

export { DashboardPaymentDataContextProvider };
