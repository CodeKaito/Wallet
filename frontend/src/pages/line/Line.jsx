import { Box, Container } from "@mui/material";
import { Header, LineChart } from "../../components";
import { useLineChartData } from "../../context/LineChartDataContext";
import { DataLineData } from "../../data";

const Line = () => {
  const dataLineChart = useLineChartData();
  return (
    <Container>
      <Box m="20px">
        <Header title="Line Chart" />
        <Box height="75vh">
          <LineChart data={dataLineChart} />
        </Box>
      </Box>
    </Container>
  );
};

export default Line;
