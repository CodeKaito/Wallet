import React, { createContext, useState, useEffect, useContext } from "react";

const DataContext = createContext({});

const BarChartDataIncomeContextProvider = ({ children }) => {
  const [dataBarChart, setDataBarChart] = useState([]);

  const generateMonthlyData = () => {
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

    const currentYear = new Date().getFullYear();

    const monthlyData = months.map((month, index) => ({
      id: index + 1,
      year: currentYear,
      month: month,
      House: 0,
      Food: 0,
      Transportation: 0,
      Personal: 0,
    }));

    return monthlyData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/payments");
        if (response.ok) {
          const barchartData = await response.json();
          const incomeData = barchartData.filter(
            (item) => item.type === "Income"
          );
          const updatedDataBarChart = generateMonthlyData().map((monthData) => {
            const filteredData = incomeData.filter((item) => {
              const itemMonth = new Date(item.date).getMonth() + 1;
              const itemYear = new Date(item.date).getFullYear();
              return itemMonth === monthData.id && itemYear === monthData.year;
            });

            const categoryTotal = {};

            filteredData.forEach((item) => {
              if (!categoryTotal[item.category]) {
                categoryTotal[item.category] = 0;
              }
              categoryTotal[item.category] += item.amount;
            });

            return {
              id: monthData.id,
              year: monthData.year,
              month: monthData.month,
              ...categoryTotal,
            };
          });

          setDataBarChart(updatedDataBarChart);
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
    <DataContext.Provider value={dataBarChart}>{children}</DataContext.Provider>
  );
};

export const useBarChartData = () => useContext(DataContext);

export { BarChartDataIncomeContextProvider };
