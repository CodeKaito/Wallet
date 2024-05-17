import { Box } from "@mui/material";
import { Header, PieChart } from "../../components";
import { DataPieChart, DataPieChart2 } from "../../data";
import {
  useHouseData,
  useFoodData,
  useTransportData,
  usePersonalData,
} from "../../context/PieChartDataContext";

const Pie = () => {
  const houseData = useHouseData();
  const foodData = useFoodData();
  const transportData = useTransportData();
  const personalData = usePersonalData();

  return (
    <>
      <Box m="20px">
        <Header title="Expenses" />
      </Box>
      <Box>
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(6, 1fr)",
            sm: "repeat(6, 1fr)",
            md: "repeat(6, 1fr)",
            lg: "repeat(12, 1fr)",
          }}
          height="40vh"
        >
          <Box gridColumn="span 6" gridRow="span 6">
            <PieChart data={houseData} />
          </Box>
          <Box gridColumn="span 6" gridRow="span 6">
            <PieChart data={foodData} />
          </Box>
        </Box>
      </Box>
      <Box>
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(6, 1fr)",
            sm: "repeat(6, 1fr)",
            md: "repeat(6, 1fr)",
            lg: "repeat(12, 1fr)",
          }}
          height="40vh"
        >
          <Box gridColumn="span 6" gridRow="span 6">
            <PieChart data={transportData} />
          </Box>
          <Box gridColumn="span 6" gridRow="span 6">
            <PieChart data={personalData} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Pie;
