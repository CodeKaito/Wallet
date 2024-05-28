import React from "react";
import Barchart from "../../components/charts/Barchart";
import { useBarChartData as useBarChartDataMonth } from "../../context/BarChartDataContext";
import { Box } from "@mui/material";

const Charts = () => {
  const dataBarChartMonth = useBarChartDataMonth();
  return (
    <>
      <Box height="300px" mt="-20px" className="border ">
        <Barchart
          isDashboard={true}
          data={dataBarChartMonth}
          dataKeys={["House", "Food", "Transportation", "Personal"]}
        />
      </Box>
    </>
  );
};

export default Charts;
