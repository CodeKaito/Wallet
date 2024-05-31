import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useUser } from "./UserContext";

const DataContext = createContext([]);

const LineChartDataContextProvider = ({ children }) => {
  const { userData, isLoading } = useUser();
  const [dataLineChart, setDataLineChart] = useState([]);

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
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        const expensesLinechartData = filteredData.filter(
          (data) => data.type !== "Income"
        );
        const incomeLinechartData = filteredData.filter(
          (data) => data.type === "Income"
        );

        const updatedExpensesData = {
          id: "Expenses",
          data: months.map((month) => ({
            x: month,
            y: expensesLinechartData
              .filter(
                (item) =>
                  new Date(item.date).getMonth() === months.indexOf(month)
              )
              .reduce((total, item) => total + item.amount, 0),
          })),
        };

        const updatedIncomeData = {
          id: "Income",
          data: months.map((month) => ({
            x: month,
            y: incomeLinechartData
              .filter(
                (item) =>
                  new Date(item.date).getMonth() === months.indexOf(month)
              )
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

export { LineChartDataContextProvider };
