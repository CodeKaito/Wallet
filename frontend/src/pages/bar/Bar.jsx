import React, { useEffect, useState } from "react";
import { Box, Container, Button } from "@mui/material";
import { Header, BarChart } from "../../components";
import { useBarChartData as useBarChartDataMonth } from "../../context/BarChartDataContext";
import { useBarChartData as useBarChartDataDays } from "../../context/BarChartDataDaysContext";

const Bar = () => {
  const dataBarChartMonth = useBarChartDataMonth();
  const dataBarChartDays = useBarChartDataDays();
  const [filteredData, setFilteredData] = useState(dataBarChartMonth);
  const [filterType, setFilterType] = useState("Year");
  const [legendText, setLegendText] = useState("Month");

  const filterByYear = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    setFilteredData(dataBarChartMonth);
    setFilterType("Year");
    setLegendText(currentYear.toString());
  };

  const filterByMonth = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("default", {
      month: "long",
    });
    setFilteredData(dataBarChartDays);
    setFilterType("Month");
    setLegendText(currentMonth);
  };

  useEffect(() => {
    filterByYear();
  }, [dataBarChartMonth]);

  return (
    <Container>
      <Box m="20px">
        <Header title="Bar Chart" />
        <Box display="flex" justifyContent="center" mt="20px">
          <Button
            variant={filterType === "Month" ? "contained" : "outlined"}
            onClick={filterByMonth}
            color="primary"
          >
            Month
          </Button>
          <Button
            variant={filterType === "Year" ? "contained" : "outlined"}
            onClick={filterByYear}
            color="primary"
            style={{ marginLeft: "10px" }}
          >
            Year
          </Button>
        </Box>
        <Box height="75vh">
          <BarChart
            data={filteredData}
            legendText={legendText}
            dataKeys={["House", "Food", "Transportation", "Personal"]}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Bar;
