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
    date: "",
    amount: "",
    note: "",
    category: "",
    label: "",
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("date", formData.date);
      form.append("amount", formData.amount);
      form.append("note", formData.note);
      form.append("category", formData.category);
      form.append("label", formData.label);

      console.log(formData.amount);
      console.log(formData.note);
      console.log(formData.category);
      console.log(formData.label);

      console.log(form);

      const response = await fetch("http://localhost:5000/api/payments", {
        method: "POST",
        body: form,
      });
      const paymentData = await response.json();
      if (response.ok) {
        console.log("response.ok: " + paymentData);
        console.log(paymentData);
      } else {
        console.log("response.nok");
        console.log(paymentData);
        throw new Error("Failed to upload form data");
      }

      const responseData = await response.json();
      console.log("Response:", responseData);
    } catch (error) {
      console.error("Error:", error);
    }
    onClose(); // Close modal after submission
  };

  // const handleDateChange = (date) => {
  //   setFormData({ ...formData, date: date.toISOString().split("T")[0] });
  // };

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
            renderInput={(params) => <TextField {...params} />}
            value={selectedDate}
            views={["day", "month", "year"]}
            slotProps={{ textField: { fullWidth: true } }}
            onChange={(newValue) => {
              setSelectedDate(newValue);
            }}
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
