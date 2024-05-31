import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useUser } from "./UserContext";

const DataContext = createContext([]);

const LineChartDataDaysContextProvider = ({ children }) => {
  const { userData, isLoading } = useUser();
  const [dataLineChart, setDataLineChart] = useState([]);

  const fetchData = useCallback(async () => {
    if (!userData) {
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/payments");
      if (response.ok) {
        const linechartData = await response.json();

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const days = Array.from({ length: 31 }, (_, i) => i + 1);

        const filteredData = linechartData.filter(
          (data) =>
            data.user._id === userData._id &&
            new Date(data.date).getMonth() === currentMonth &&
            new Date(data.date).getFullYear() === currentYear
        );

        const expensesLinechartData = filteredData.filter(
          (data) => data.type === "Expenses"
        );
        const incomeLinechartData = filteredData.filter(
          (data) => data.type === "Income"
        );

        const updatedExpensesData = {
          id: "Expenses",
          data: days.map((day) => ({
            x: day,
            y: expensesLinechartData
              .filter((item) => new Date(item.date).getDate() === day)
              .reduce((total, item) => total + item.amount, 0),
          })),
        };

        const updatedIncomeData = {
          id: "Income",
          data: days.map((day) => ({
            x: day,
            y: incomeLinechartData
              .filter((item) => new Date(item.date).getDate() === day)
              .reduce((total, item) => total + item.amount, 0),
          })),
        };

        const newDataLineChart = [updatedIncomeData, updatedExpensesData];
        setDataLineChart(newDataLineChart);
      } else {
        console.log("Error fetching chart data");
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

  return (
    <DataContext.Provider value={dataLineChart}>
      {children}
    </DataContext.Provider>
  );
};

export const useLineChartData = () => useContext(DataContext);

export { LineChartDataDaysContextProvider };
