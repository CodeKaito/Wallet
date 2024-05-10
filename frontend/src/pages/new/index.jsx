import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Header } from "../../components";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px");
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  return (
    <Box m="20px">
      <Header title="New Payment" />
    </Box>
  );
};

export default Form;
