import React, { createContext, useState, useEffect, useContext } from "react";

const DataContext = createContext([]);

const BarChartDataDaysContextProvider = ({ children }) => {
  const [dataBarChart, setDataBarChart] = useState([]);

  const generateMonthlyData = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Ottieni il numero di giorni nel mese corrente

    const monthlyData = Array.from({ length: daysInMonth }, (_, index) => ({
      id: index + 1,
      year: currentYear,
      month: currentMonth,
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
          const updatedDataBarChart = generateMonthlyData().map((dayData) => {
            const filteredData = barchartData.filter((item) => {
              const itemDay = new Date(item.date).getDate();
              const itemMonth = new Date(item.date).getMonth();
              const itemYear = new Date(item.date).getFullYear();
              return (
                itemDay === dayData.id &&
                itemMonth === dayData.month &&
                itemYear === dayData.year
              );
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
              ...dayData,
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

export { BarChartDataDaysContextProvider };
