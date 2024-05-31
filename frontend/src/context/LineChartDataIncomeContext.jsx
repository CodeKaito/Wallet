import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useUser } from "./UserContext";

const DataContext = createContext([]);

const LineChartDataIncomeContextProvider = ({ children }) => {
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

        const incomeLinechartData = linechartData.filter(
          (data) => data.type === "Income" && data.user._id === userData._id
        );

        const updatedIncomeData = {
          id: "Income",
          data: months.map((month, index) => ({
            x: month,
            y: incomeLinechartData
              .filter((item) => new Date(item.date).getMonth() === index)
              .reduce((total, item) => total + item.amount, 0),
          })),
        };

        const newDataLineChart = [updatedIncomeData];
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

export { LineChartDataIncomeContextProvider };
