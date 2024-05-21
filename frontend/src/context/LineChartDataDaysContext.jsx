import React, { createContext, useState, useEffect, useContext } from "react";

const DataContext = createContext([]);

const LineChartDataDaysContextProvider = ({ children }) => {
  const [dataLineChart, setDataLineChart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/payments");
        if (response.ok) {
          const linechartData = await response.json();
          const days = Array.from({ length: 31 }, (_, i) => i + 1);

          const expensesLinechartData = linechartData.filter(
            (data) => data.type !== "Income"
          );
          const incomeLinechartData = linechartData.filter(
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
    };
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={dataLineChart}>
      {children}
    </DataContext.Provider>
  );
};

export const useLineChartData = () => useContext(DataContext);

export { LineChartDataDaysContextProvider };
