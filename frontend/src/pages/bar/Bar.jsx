import { Box, Container } from "@mui/material";
import { Header, BarChart } from "../../components";
import { useBarChartData } from "../../context/BarChartDataContext";
import { DataBarChart } from "../../data";

const Bar = () => {
  const dataBarChart = useBarChartData();
  console.log(dataBarChart);
  return (
    <Container>
      <Box m="20px">
        <Header title="Bar Chart" />
        <Box height="75vh">
          <BarChart data={DataBarChart} />
        </Box>
      </Box>
    </Container>
  );
};

export default Bar;
