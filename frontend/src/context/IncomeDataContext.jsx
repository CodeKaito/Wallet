import React, { createContext, useState, useEffect, useContext } from "react";

const DataContext = createContext();

const IncomeDataContextProvider = ({ children }) => {
  const [paymentData, setPaymentData] = useState([]);
  const [filteredByMonth, setFilteredByMonth] = useState([]);
  const [filteredByYear, setFilteredByYear] = useState([]);
  const [filteredByPreviousMonth, setFilteredByPreviousMonth] = useState([]);
  const [filteredByPreviousYear, setFilteredByPreviousYear] = useState([]);
  const [monthlyTotals, setMonthlyTotals] = useState(0);
  const [yearlyTotals, setYearlyTotals] = useState(0);
  const [monthlyPreviousTotals, setMonthlyPreviousTotals] = useState(0);
  const [yearlyPreviousTotals, setYearlyPreviousTotals] = useState(0);

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
    const previousMonthData = filterIncomePaymentsByPreviousMonth();
    const previousYearData = filterIncomePaymentsByPreviousYear();

    setFilteredByMonth(monthlyData);
    setFilteredByYear(yearlyData);
    setFilteredByPreviousMonth(previousMonthData);
    setFilteredByPreviousYear(previousYearData);

    setMonthlyTotals(calculateMonthlyTotals(monthlyData));
    setYearlyTotals(calculateYearlyTotals(yearlyData));
    setMonthlyPreviousTotals(calculateMonthlyTotals(previousMonthData));
    setYearlyPreviousTotals(calculateYearlyTotals(previousYearData));
  }, [paymentData]);

  const filterIncomePaymentsByMonth = () => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const filteredData = paymentData.filter(
      (payment) =>
        payment.type === "Income" &&
        payment.date.getMonth() + 1 === currentMonth &&
        payment.date.getFullYear() === currentYear
    );

    return filteredData;
  };

  const filterIncomePaymentsByPreviousMonth = () => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

    const filteredData = paymentData.filter(
      (payment) =>
        payment.type === "Income" &&
        payment.date.getMonth() + 1 === previousMonth &&
        payment.date.getFullYear() === previousYear
    );

    return filteredData;
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

  const filterIncomePaymentsByPreviousYear = () => {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;

    const filteredData = paymentData.filter(
      (payment) =>
        payment.type === "Income" && payment.date.getFullYear() === previousYear
    );

    return filteredData;
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

    const totalSum = Object.values(totals).reduce((acc, curr) => acc + curr, 0);

    return totalSum;
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

    const totalSum = Object.values(totals).reduce((acc, curr) => acc + curr, 0);

    return totalSum;
  };

  return (
    <DataContext.Provider
      value={{
        paymentData,
        filteredByMonth,
        filteredByYear,
        filteredByPreviousMonth,
        filteredByPreviousYear,
        monthlyTotals,
        yearlyTotals,
        monthlyPreviousTotals,
        yearlyPreviousTotals,
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
