import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { CloseIcon } from "../icons";

const AddPaymentModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    date: new Date(),
    name: "",
    amount: "",
    note: "",
  });

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      date: date,
    }));
    console.log(date);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #141B2D",
    boxShadow: 24,
    zIndex: 999,
    borderRadius: "10px",
    p: 4,
  };
  return (
    <Box sx={style}>
      <CloseIcon className="mb-3 cursor-pointer" onClick={onClose} />
      <Typography variant="h6" gutterBottom>
        Register a Payment
      </Typography>
      <form onSubmit={handleSubmit}>
        <DatePicker
          label="Date"
          slotProps={{ textField: { fullWidth: true } }}
          onChange={handleDateChange}
        />
        <div className="mt-5">
          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              inputProps={{ min: 0, step: 0.01 }}
            />
          </FormControl>
        </div>
        <TextField
          fullWidth
          margin="normal"
          label="Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Note"
          name="note"
          value={formData.note}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AddPaymentModal;
