import React, { createContext, useState, useEffect, useContext } from "react";
const DayDataContext = createContext({});

const BarChartDataDaysIncomeContextProvider = ({ children }) => {
  const [dataDaysBarChart, setDataDaysBarChart] = useState([]);

  const generateMonthlyDayData = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const monthlyDayData = Array.from({ length: daysInMonth }, (_, index) => ({
      id: index + 1,
      year: currentYear,
      month: currentMonth + 1,
      day: index + 1,
    }));

    return monthlyDayData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dayDataFromApi = generateMonthlyDayData();

        setDataDaysBarChart(dayDataFromApi);
      } catch (error) {
        console.error("Error fetching day data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DayDataContext.Provider value={dataDaysBarChart}>
      {children}
    </DayDataContext.Provider>
  );
};

export const useBarChartDataDays = () => useContext(DayDataContext);

export { BarChartDataDaysIncomeContextProvider };
