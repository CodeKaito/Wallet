import { Box, Container } from "@mui/material";
import { Header, BarChart } from "../../components";

const Bar = () => {
  return (
    <Container>
      <Box m="20px">
        <Header title="Bar Chart" />
        <Box height="75vh">
          <BarChart />
        </Box>
      </Box>
    </Container>
  );
};

export default Bar;
