import { Box } from "@mui/material";

const ProgressCircle = ({ progress, size = "30" }) => {
  const angle = progress * 360;

  return (
    <Box
      sx={{
        background: `radial-gradient(#141B2D 55%, transparent 56%),
                      conic-gradient(transparent 0deg ${angle}deg, #141B2D ${angle}deg 360deg),
                      #EDEDED`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
