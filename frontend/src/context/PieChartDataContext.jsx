import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import {
  isToday,
  isThisWeek,
  isThisMonth,
  isThisYear,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { useUser } from "./UserContext";

const DataContext = createContext({
  HouseData: [],
  FoodData: [],
  TransportData: [],
  PersonalData: [],
  filterData: () => {},
});

const PieChartDataContextProvider = ({ children }) => {
  const { userData, isLoading } = useUser();
  const [HouseData, setHouseData] = useState([]);
  const [FoodData, setFoodData] = useState([]);
  const [TransportData, setTransportData] = useState([]);
  const [PersonalData, setPersonalData] = useState([]);

  const fetchData = useCallback(async () => {
    if (!userData) {
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/payments");
      if (response.ok) {
        const paymentData = await response.json();
        const filteredData = paymentData.filter(
          (item) => item.type !== "Income" && item.user._id === userData._id
        );
        const transformedData = filteredData.map((item) => ({
          ...item,
          date: new Date(item.date),
          _id: item._id,
          id: item.label,
          label: item.label,
          value: item.amount,
        }));
        const houseCategory = transformedData.filter(
          (item) => item.category === "House"
        );
        setHouseData(houseCategory);

        const foodCategory = transformedData.filter(
          (item) => item.category === "Food"
        );
        setFoodData(foodCategory);

        const transportCategory = transformedData.filter(
          (item) => item.category === "Transportation"
        );
        setTransportData(transportCategory);

        const personalCategory = transformedData.filter(
          (item) => item.category === "Personal"
        );
        setPersonalData(personalCategory);
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

  const filterData = (data, period) => {
    const today = new Date();
    switch (period) {
      case "day":
        return data.filter((item) => isToday(item.date));
      case "week":
        const start = startOfWeek(today, { weekStartsOn: 1 });
        const end = endOfWeek(today, { weekStartsOn: 1 });
        return data.filter((item) => item.date >= start && item.date <= end);
      case "month":
        return data.filter((item) => isThisMonth(item.date));
      case "year":
        return data.filter((item) => isThisYear(item.date));
      default:
        return data;
    }
  };

  return (
    <DataContext.Provider
      value={{
        HouseData,
        FoodData,
        TransportData,
        PersonalData,
        filterData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useHouseData = () => useContext(DataContext).HouseData;
export const useFoodData = () => useContext(DataContext).FoodData;
export const useTransportData = () => useContext(DataContext).TransportData;
export const usePersonalData = () => useContext(DataContext).PersonalData;
export const useFilterData = () => useContext(DataContext).filterData;

export { PieChartDataContextProvider };
