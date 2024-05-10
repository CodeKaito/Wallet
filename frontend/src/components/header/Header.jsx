import { Box } from "@mui/material";

const Header = ({ title, subtitle }) => {
  return (
    <Box mb="30px">
      <div className="color-gray-200 font-bold text-lg lg:text-3xl">
        {title}
      </div>
      <div className="color-white-100 hidden md:block">{subtitle}</div>
    </Box>
  );
};

export default Header;
