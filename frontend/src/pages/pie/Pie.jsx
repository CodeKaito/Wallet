import { Box, IconButton } from "@mui/material";
import { Header, PieChart } from "../../components";
import { useState } from "react";
import {
  useHouseData,
  useFoodData,
  useTransportData,
  usePersonalData,
} from "../../context/PieChartDataContext";
import {
  CottageIcon,
  SelfImprovementIcon,
  DirectionsCarFilledIcon,
  LunchDiningIcon,
} from "../../icons";

const Pie = () => {
  const [selectedChart, setSelectedChart] = useState("house");
  const [selectedCategory, setSelectedCategory] = useState("House");
  const houseData = useHouseData();
  const foodData = useFoodData();
  const transportData = useTransportData();
  const personalData = usePersonalData();

  const handleChartChange = (chartType, categoryName) => {
    setSelectedChart(chartType);
    setSelectedCategory(categoryName);
  };

  const renderSelectedChart = () => {
    switch (selectedChart) {
      case "house":
        return <PieChart data={houseData} />;
      case "food":
        return <PieChart data={foodData} />;
      case "transport":
        return <PieChart data={transportData} />;
      case "personal":
        return <PieChart data={personalData} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Box m="20px">
        <Header title={`Expenses for ${selectedCategory}`} />
        <IconButton
          color={selectedChart === "house" ? "primary" : "default"}
          onClick={() => handleChartChange("house", "House")}
        >
          <CottageIcon />
        </IconButton>
        <IconButton
          color={selectedChart === "food" ? "primary" : "default"}
          onClick={() => handleChartChange("food", "Food")}
        >
          <LunchDiningIcon />
        </IconButton>
        <IconButton
          color={selectedChart === "transport" ? "primary" : "default"}
          onClick={() => handleChartChange("transport", "Transport")}
        >
          <DirectionsCarFilledIcon />
        </IconButton>
        <IconButton
          color={selectedChart === "personal" ? "primary" : "default"}
          onClick={() => handleChartChange("personal", "Personal")}
        >
          <SelfImprovementIcon />
        </IconButton>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        {renderSelectedChart()}
      </Box>
    </>
  );
};

export default Pie;
