import { Box, Typography } from "@mui/material";
import ProgressCircle from "../progressCircle/ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, stats }) => {
  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            fontWeight="bold"
            sx={{ fontSize: { xs: "1.2rem", md: "2rem" } }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}>
          {subtitle}
        </Typography>
        <Typography
          sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
          fontStyle="italic"
        >
          {stats}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
