import React, { createContext, useState, useEffect, useContext } from "react";

const DataContext = createContext([]);

const LineChartDataContextProvider = ({ children }) => {
  const [dataLineChart, setDataLineChart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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

          const expensesLinechartData = linechartData.filter(
            (data) => data.type !== "Income"
          );
          const incomeLinechartData = linechartData.filter(
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

export { LineChartDataContextProvider };
