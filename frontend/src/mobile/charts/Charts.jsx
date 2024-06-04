import React, { useEffect, useState } from "react";
import Barchart from "../../components/charts/Barchart";
import { useBarChartData as useBarChartDataMonth } from "../../context/BarChartDataContext";
import { useBarChartData as useBarChartDataDays } from "../../context/BarChartDataDaysContext";
import { useLineChartData as useLineChartDataMonth } from "../../context/LineChartDataContext";
import { useLineChartData as useLineChartDataDays } from "../../context/LineChartDataDaysContext";
import { useBarChartData } from "../../context/BarChartDataIncomeContext";
import { useLineChartData } from "../../context/LineChartDataIncomeContext";

import { Box } from "@mui/material";
import { Tabs, TabList, Tab, TabPanel, Select, Option } from "@mui/joy";
import { LineChart } from "../../components";

const Charts = () => {
  const dataLineChartMonth = useLineChartDataMonth();
  const dataLineChartDays = useLineChartDataDays();
  const dataBarChartMonth = useBarChartDataMonth();
  const dataBarChartDays = useBarChartDataDays();
  const dataBarChart = useBarChartData();
  const dataLineChart = useLineChartData();
  const [filteredBarChartData, setFilteredBarChartData] =
    useState(dataBarChartMonth);
  const [filteredLineChartData, setFilteredLineChartData] =
    useState(dataLineChartMonth);
  const [filterType, setFilterType] = useState("Year");
  const [legendText, setLegendText] = useState("Month");

  const filterByYear = () => {
    setFilteredBarChartData(dataBarChartMonth);
    setFilteredLineChartData(dataLineChartMonth);
    setFilterType("Year");
    setLegendText("Year");
  };

  const filterByMonth = () => {
    setFilteredBarChartData(dataBarChartDays);
    setFilteredLineChartData(dataLineChartDays);
    setFilterType("Month");
    setLegendText("Month");
  };

  useEffect(() => {
    filterByYear();
  }, [dataBarChartMonth]);

  return (
    <>
      <Tabs aria-label="Basic tabs" defaultValue={0}>
        <TabList className="flex justify-center">
          <Tab>Expenses</Tab>
          <Tab>Income</Tab>
        </TabList>
        <TabPanel value={0}>
          <div className="flex align-center items-center">
            <Select placeholder="Filter" className="flex w-40" size="sm">
              <Option onClick={filterByMonth}>Month</Option>
              <Option onClick={filterByYear}>Year</Option>
            </Select>
            <p className="ms-5">
              Set filter by this <b>{filterType}</b>
            </p>
          </div>

          <Box height="300px" mt="20px" className="border">
            <Barchart
              isDashboard={true}
              data={filteredBarChartData}
              isMobile={true}
              dataKeys={["House", "Food", "Transportation", "Personal"]}
            />
          </Box>
          <Box height="300px" className="border">
            <LineChart
              isDashboard={true}
              data={filteredLineChartData}
              legendText={legendText}
              isMobile={true}
            />
          </Box>
        </TabPanel>
        <TabPanel value={1}>
          <Box height="300px" mt="20px" className="border">
            <Barchart
              isDashboard={true}
              data={dataBarChart}
              isMobile={true}
              dataKeys={["Salary"]}
            />
          </Box>
          <Box height="300px" className="border">
            <LineChart
              data={dataLineChart}
              legendText={legendText}
              isMobile={true}
              isDashboard={true}
            />
          </Box>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default Charts;
