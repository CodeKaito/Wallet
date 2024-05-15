import { Box, Container } from "@mui/material";
import { Header, LineChart } from "../../components";

const Line = () => {
  return (
    <Container>
      <Box m="20px">
        <Header title="Line Chart" />
        <Box height="75vh">
          <LineChart />
        </Box>
      </Box>
    </Container>
  );
};

export default Line;
