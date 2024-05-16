import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  Modal,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CloseIcon } from "../icons";

const AddPaymentModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    date: new Date(),
    amount: "",
    note: "",
    category: "",
    label: "",
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        date: formData.date,
        amount: formData.amount,
        note: formData.note,
        category: formData.category,
        label: formData.label,
      };

      console.log(requestBody);

      const response = await fetch("http://localhost:5000/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const paymentData = await response.json();
      if (response.ok) {
        console.log("response.ok: ", paymentData);
      } else {
        console.log("response.nok: ", paymentData);
        throw new Error("Failed to upload form data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CloseIcon className="mb-3 cursor-pointer" onClick={onClose} />
        <Typography variant="h6" gutterBottom>
          Register a Payment
        </Typography>
        <form onSubmit={handleSubmit}>
          <DatePicker
            label="Date"
            inputFormat="DD/MM/YYYY"
            name="date"
            views={["day", "month", "year"]}
            renderInput={(params) => <TextField {...params} />}
            slotProps={{ textField: { fullWidth: true } }}
            onChange={handleDateChange}
          />
          <div className="mt-5">
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">
                Amount
              </InputLabel>
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
          <div className="mt-5">
            <FormControl fullWidth>
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="category"
                id="category"
                name="category"
                value={formData.category}
                label="Category"
                onChange={handleChange}
              >
                <MenuItem value={"School"}>School</MenuItem>
                <MenuItem value={"Health"}>Health</MenuItem>
                <MenuItem value={"Home"}>Home</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="mt-5">
            <FormControl fullWidth>
              <InputLabel id="label">Label</InputLabel>
              <Select
                labelId="label"
                id="label"
                name="label"
                value={formData.label}
                label="Label"
                onChange={handleChange}
              >
                <MenuItem value={"School"}>School</MenuItem>
                <MenuItem value={"Health"}>Health</MenuItem>
                <MenuItem value={"Home"}>Home</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="mt-5">
            <FormControl fullWidth>
              <TextField
                fullWidth
                margin="normal"
                label="Note"
                name="note"
                value={formData.note}
                onChange={handleChange}
              />
            </FormControl>
          </div>

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddPaymentModal;
