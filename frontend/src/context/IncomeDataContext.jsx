import React, { createContext, useState, useEffect, useContext } from "react";

const DataContext = createContext();

const IncomeDataContextProvider = ({ children }) => {
  const [paymentData, setPaymentData] = useState([]);
  const [filteredByMonth, setFilteredByMonth] = useState([]);
  const [filteredByYear, setFilteredByYear] = useState([]);
  const [monthlyTotals, setMonthlyTotals] = useState([]);
  const [yearlyTotals, setYearlyTotals] = useState([]);

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

  useEffect(() => {
    const monthlyData = filterIncomePaymentsByMonth();
    const yearlyData = filterIncomePaymentsByYear();
    setFilteredByMonth(monthlyData);
    setFilteredByYear(yearlyData);
    setMonthlyTotals(calculateMonthlyTotals(monthlyData));
    setYearlyTotals(calculateYearlyTotals(yearlyData));
  }, [paymentData]);

  const filterIncomePaymentsByMonth = () => {
    const filteredData = paymentData.filter(
      (payment) => payment.type === "Income"
    );
    const result = [];

    filteredData.forEach((payment) => {
      const month = payment.date.getMonth() + 1;
      const year = payment.date.getFullYear();
      result.push({ ...payment, month, year });
    });

    return result;
  };

  const filterIncomePaymentsByYear = () => {
    const filteredData = paymentData.filter(
      (payment) => payment.type === "Income"
    );
    const result = [];

    filteredData.forEach((payment) => {
      const year = payment.date.getFullYear();
      result.push({ ...payment, year });
    });

    return result;
  };

  const calculateMonthlyTotals = (data) => {
    const totals = {};

    data.forEach((payment) => {
      const key = `${payment.year}-${payment.month}`;
      if (!totals[key]) {
        totals[key] = 0;
      }
      totals[key] += payment.amount;
    });

    const monthlyTotalsArray = Object.values(totals);

    return monthlyTotalsArray;
  };

  const calculateYearlyTotals = (data) => {
    const totals = {};

    data.forEach((payment) => {
      const key = payment.year;
      if (!totals[key]) {
        totals[key] = 0;
      }
      totals[key] += payment.amount;
    });

    const yearlyTotalsArray = Object.values(totals);

    return yearlyTotalsArray;
  };

  return (
    <DataContext.Provider
      value={{
        paymentData,
        filteredByMonth,
        filteredByYear,
        monthlyTotals,
        yearlyTotals,
        filterIncomePaymentsByMonth,
        filterIncomePaymentsByYear,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useIncomeData = () => useContext(DataContext);

export { IncomeDataContextProvider };
