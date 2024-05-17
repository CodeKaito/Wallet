import React, { createContext, useState, useEffect, useContext } from "react";

const DataContext = createContext({});

const BarChartDataContextProvider = ({ children }) => {
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
          const updatedDataBarChart = generateMonthlyData().map((monthData) => {
            const filteredData = barchartData.filter((item) => {
              const itemMonth = new Date(item.date).getMonth();
              const itemYear = new Date(item.date).getFullYear();
              return itemMonth === monthData.id && itemYear === monthData.year;
            });

            const houseTotal = filteredData.reduce((acc, curr) => {
              if (curr.category === "House") {
                return acc + curr.amount;
              } else {
                return acc;
              }
            }, 0);

            const foodTotal = filteredData.reduce((acc, curr) => {
              if (curr.category === "Food") {
                return acc + curr.amount;
              } else {
                return acc;
              }
            }, 0);

            const transportationTotal = filteredData.reduce((acc, curr) => {
              if (curr.category === "Transportation") {
                return acc + curr.amount;
              } else {
                return acc;
              }
            }, 0);

            const personalTotal = filteredData.reduce((acc, curr) => {
              if (curr.category === "Personal") {
                return acc + curr.amount;
              } else {
                return acc;
              }
            }, 0);

            return {
              id: monthData.id,
              year: monthData.year,
              month: monthData.month,
              House: houseTotal,
              Food: foodTotal,
              Transportation: transportationTotal,
              Personal: personalTotal,
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

export { BarChartDataContextProvider };
