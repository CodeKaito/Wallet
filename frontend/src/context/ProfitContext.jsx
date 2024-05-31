import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useUser } from "./UserContext";

const DataContext = createContext();

const ProfitDataContextProvider = ({ children }) => {
  const { userData, isLoading } = useUser();
  const [paymentData, setPaymentData] = useState([]);
  const [currentMonthProfit, setCurrentMonthProfit] = useState(0);
  const [currentYearProfit, setCurrentYearProfit] = useState(0);
  const [previousMonthProfit, setPreviousMonthProfit] = useState(0);
  const [previousYearProfit, setPreviousYearProfit] = useState(0);

  const fetchData = useCallback(async () => {
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

  useEffect(() => {
    setCurrentMonthProfit(calculateCurrentMonthProfit());
    setCurrentYearProfit(calculateCurrentYearProfit());
  }, [paymentData]);

  useEffect(() => {
    setPreviousMonthProfit(calculatePreviousMonthProfit());
  }, [paymentData]);

  useEffect(() => {
    setPreviousYearProfit(calculatePreviousYearProfit());
  }, [paymentData]);

  const updatePaymentData = async (newPaymentData) => {
    try {
      setPaymentData((prevData) => [...prevData, newPaymentData]);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const calculateCurrentMonthProfit = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const currentMonthData = paymentData.filter(
      (item) =>
        item.date.getMonth() + 1 === currentMonth &&
        item.date.getFullYear() === currentYear
    );

    const currentMonthIncome = currentMonthData
      .filter((item) => item.type === "Income")
      .reduce((total, item) => total + item.amount, 0);

    const currentMonthExpenses = currentMonthData
      .filter((item) => item.type === "Expenses")
      .reduce((total, item) => total + item.amount, 0);

    return currentMonthIncome - currentMonthExpenses;
  };

  const calculateCurrentYearProfit = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const currentYearData = paymentData.filter(
      (item) => item.date.getFullYear() === currentYear
    );

    const currentYearIncome = currentYearData
      .filter((item) => item.type === "Income")
      .reduce((total, item) => total + item.amount, 0);

    const currentYearExpenses = currentYearData
      .filter((item) => item.type === "Expenses")
      .reduce((total, item) => total + item.amount, 0);

    return currentYearIncome - currentYearExpenses;
  };

  const calculatePreviousMonthProfit = () => {
    const currentDate = new Date();
    const previousMonthDate = new Date(currentDate);
    previousMonthDate.setMonth(currentDate.getMonth() - 1);

    const previousMonth = previousMonthDate.getMonth() + 1;
    const previousYear = previousMonthDate.getFullYear();

    const previousMonthData = paymentData.filter(
      (item) =>
        item.date.getMonth() + 1 === previousMonth &&
        item.date.getFullYear() === previousYear
    );

    const previousMonthIncome = previousMonthData
      .filter((item) => item.type === "Income")
      .reduce((total, item) => total + item.amount, 0);

    const previousMonthExpenses = previousMonthData
      .filter((item) => item.type === "Expenses")
      .reduce((total, item) => total + item.amount, 0);

    return previousMonthIncome - previousMonthExpenses;
  };

  const calculatePreviousYearProfit = () => {
    const currentDate = new Date();
    const previousYear = currentDate.getFullYear() - 1;

    const previousYearData = paymentData.filter(
      (item) => item.date.getFullYear() === previousYear
    );

    const previousYearIncome = previousYearData
      .filter((item) => item.type === "Income")
      .reduce((total, item) => total + item.amount, 0);

    const previousYearExpenses = previousYearData
      .filter((item) => item.type === "Expenses")
      .reduce((total, item) => total + item.amount, 0);

    return previousYearIncome - previousYearExpenses;
  };

  return (
    <DataContext.Provider
      value={{
        paymentData,
        updatePaymentData,
        currentMonthProfit,
        previousMonthProfit,
        previousYearProfit,
        currentYearProfit,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useProfitData = () => useContext(DataContext);

export { ProfitDataContextProvider };
