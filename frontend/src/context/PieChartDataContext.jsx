import React, { createContext, useState, useEffect, useContext } from "react";

const DataContext = createContext({
  HouseData: [],
  FoodData: [],
  TransportationData: [],
  PersonalData: [],
});

const PieChartDataContextProvider = ({ children }) => {
  const [HouseData, setHouseData] = useState([]);
  const [FoodData, setFoodData] = useState([]);
  const [TransportData, setTransportData] = useState([]);
  const [PersonalData, setPersonalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/payments");
        if (response.ok) {
          const paymentData = await response.json();
          const transformedData = paymentData.map((item) => ({
            ...item,
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
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        HouseData,
        FoodData,
        TransportData,
        PersonalData,
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

export { PieChartDataContextProvider };
