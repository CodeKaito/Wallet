import React, { useEffect, useState } from "react";
import { Box, Container, Button } from "@mui/material";
import { Header, LineChart } from "../../components";
import { useLineChartData as useLineChartDataMonth } from "../../context/LineChartDataContext";
import { useLineChartData as useLineChartDataDays } from "../../context/LineChartDataDaysContext";

const Line = () => {
  const dataLineChartMonth = useLineChartDataMonth();
  const dataLineChartDays = useLineChartDataDays();
  const [filteredData, setFilteredData] = useState(dataLineChartMonth);
  const [filterType, setFilterType] = useState("Year");
  const [legendText, setLegendText] = useState("Month");

  const filterByYear = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    setFilteredData(dataLineChartMonth);
    setFilterType("Year");
    setLegendText(currentYear.toString());
  };

  const filterByMonth = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("default", {
      month: "long",
    });
    setFilteredData(dataLineChartDays);
    setFilterType("Month");
    setLegendText(currentMonth);
  };

  useEffect(() => {
    filterByYear();
  }, [dataLineChartMonth]);

  return (
    <Container>
      <Box m="20px">
        <Header title="Line Chart" />
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
          <LineChart data={filteredData} legendText={legendText} />
        </Box>
      </Box>
    </Container>
  );
};

export default Line;
