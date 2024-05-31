import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useUser } from "./UserContext";
import CustomLoader from "../utils/CustomLoader";

const DataContext = createContext({});

const BarChartDataContextProvider = ({ children }) => {
  const { userData, isLoading: userLoading } = useUser();
  const [dataBarChart, setDataBarChart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const fetchData = useCallback(async () => {
    if (!userData) {
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/payments");
      if (response.ok) {
        const data = await response.json();
        const barchartData = data.filter(
          (data) => data.user._id === userData._id
        );
        const updatedDataBarChart = generateMonthlyData().map((monthData) => {
          const filteredData = barchartData.filter((item) => {
            const itemMonth = new Date(item.date).getMonth() + 1;
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
        setIsLoading(false);
      } else {
        console.log("Error fetching chart data");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }, [userData]);

  useEffect(() => {
    if (!userLoading && userData && isLoading) {
      fetchData();
    }
  }, [fetchData, userLoading, userData, isLoading]);

  if (isLoading || userLoading) {
    return <CustomLoader />;
  }

  return (
    <DataContext.Provider value={dataBarChart}>{children}</DataContext.Provider>
  );
};

export const useBarChartData = () => useContext(DataContext);

export { BarChartDataContextProvider };
