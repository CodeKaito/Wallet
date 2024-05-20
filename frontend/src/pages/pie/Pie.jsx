import { Box, IconButton, Button, Typography } from "@mui/material";
import { Header, PieChart } from "../../components";
import { useState } from "react";
import {
  useHouseData,
  useFoodData,
  useTransportData,
  usePersonalData,
  useFilterData,
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
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const houseData = useHouseData();
  const foodData = useFoodData();
  const transportData = useTransportData();
  const personalData = usePersonalData();
  const filterData = useFilterData();

  const handleChartChange = (chartType, categoryName) => {
    setSelectedChart(chartType);
    setSelectedCategory(categoryName);
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  const renderSelectedChart = () => {
    let data;
    switch (selectedChart) {
      case "house":
        data = filterData(houseData, selectedPeriod);
        break;
      case "food":
        data = filterData(foodData, selectedPeriod);
        break;
      case "transport":
        data = filterData(transportData, selectedPeriod);
        break;
      case "personal":
        data = filterData(personalData, selectedPeriod);
        break;
      default:
        data = [];
    }
    return data.length > 0 ? (
      <PieChart data={data} />
    ) : (
      <Typography>No data available for the filter selected</Typography>
    );
  };

  return (
    <>
      <Box m="20px">
        <Header title={`Expenses for ${selectedCategory}`} />
        <Box display="flex" alignItems="center">
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
        <Box display="flex" justifyContent="center" mt="20px">
          <Button
            variant={selectedPeriod === "day" ? "contained" : "outlined"}
            color="primary"
            onClick={() => handlePeriodChange("day")}
          >
            Day
          </Button>
          <Button
            variant={selectedPeriod === "week" ? "contained" : "outlined"}
            color="primary"
            onClick={() => handlePeriodChange("week")}
            style={{ marginLeft: "10px" }}
          >
            Week
          </Button>
          <Button
            variant={selectedPeriod === "month" ? "contained" : "outlined"}
            color="primary"
            onClick={() => handlePeriodChange("month")}
            style={{ marginLeft: "10px" }}
          >
            Month
          </Button>
          <Button
            variant={selectedPeriod === "year" ? "contained" : "outlined"}
            color="primary"
            onClick={() => handlePeriodChange("year")}
            style={{ marginLeft: "10px" }}
          >
            Year
          </Button>
        </Box>
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
