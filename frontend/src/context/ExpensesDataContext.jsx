import React, { createContext, useState, useEffect, useContext } from "react";

const DataContext = createContext();

const ExpensesDataContextProvider = ({ children }) => {
  const [paymentData, setPaymentData] = useState([]);
  const [currentMonthExpenses, setCurrentMonthExpenses] = useState(0);
  const [previousMonthExpenses, setPreviousMonthExpenses] = useState(0);
  const [currentYearExpenses, setCurrentYearExpenses] = useState(0);
  const [previousYearExpenses, setPreviousYearExpenses] = useState(0);

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
    setCurrentMonthExpenses(getCurrentMonthExpenses());
    setCurrentYearExpenses(getCurrentYearExpenses());
  }, [paymentData]);

  useEffect(() => {
    const previousMonthExpensesTotal = getPreviousMonthExpenses();
    const previousYearExpensesTotal = getPreviousYearExpenses();
    setPreviousMonthExpenses(previousMonthExpensesTotal);
    setPreviousYearExpenses(previousYearExpensesTotal);
  }, [paymentData]);

  const updatePaymentData = async (newPaymentData) => {
    try {
      setPaymentData((prevData) => [...prevData, newPaymentData]);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const getCurrentMonthExpenses = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const currentMonthExpenses = paymentData.filter(
      (item) =>
        item.date.getMonth() + 1 === currentMonth &&
        item.date.getFullYear() === currentYear &&
        item.type === "Expenses"
    );

    return currentMonthExpenses.reduce((total, item) => total + item.amount, 0);
  };

  const getCurrentYearExpenses = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const currentYearExpenses = paymentData.filter(
      (item) =>
        item.date.getFullYear() === currentYear && item.type === "Expenses"
    );

    return currentYearExpenses.reduce((total, item) => total + item.amount, 0);
  };

  const getPreviousMonthExpenses = () => {
    const currentDate = new Date();
    const previousMonthDate = new Date(currentDate);
    previousMonthDate.setMonth(currentDate.getMonth() - 1);

    const previousMonth = previousMonthDate.getMonth() + 1;
    const previousYear = previousMonthDate.getFullYear();

    const previousMonthExpenses = paymentData.filter(
      (item) =>
        item.date.getMonth() + 1 === previousMonth &&
        item.date.getFullYear() === previousYear &&
        item.type === "Expenses"
    );

    return previousMonthExpenses.reduce(
      (total, item) => total + item.amount,
      0
    );
  };

  const getPreviousYearExpenses = () => {
    const currentDate = new Date();
    const previousYear = currentDate.getFullYear() - 1;

    const previousYearExpenses = paymentData.filter(
      (item) =>
        item.date.getFullYear() === previousYear && item.type === "Expenses"
    );

    return previousYearExpenses.reduce((total, item) => total + item.amount, 0);
  };

  console.log(previousMonthExpenses);
  console.log(previousYearExpenses);

  return (
    <DataContext.Provider
      value={{
        paymentData,
        updatePaymentData,
        currentMonthExpenses,
        currentYearExpenses,
        previousMonthExpenses,
        previousYearExpenses,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useExpensesData = () => useContext(DataContext);

export { ExpensesDataContextProvider };
