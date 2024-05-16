import { Box, Container } from "@mui/material";
import { Header, PieChart } from "../../components";

const Pie = () => {
  return (
    <>
      <Box m="20px">
        <Header title="Pie Chart" />
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
            <PieChart />
          </Box>
          <Box gridColumn="span 6" gridRow="span 6">
            <PieChart />
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
            <PieChart />
          </Box>
          <Box gridColumn="span 6" gridRow="span 6">
            <PieChart />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Pie;
