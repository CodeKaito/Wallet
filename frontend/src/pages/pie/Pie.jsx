import { Box, Container } from "@mui/material";
import { Header, PieChart } from "../../components";

const Pie = () => {
  return (
    <Container>
      <Box m="20px">
        <Header title="Pie Chart" />
        <Box height="75vh">
          <PieChart />
        </Box>
      </Box>
    </Container>
  );
};

export default Pie;
