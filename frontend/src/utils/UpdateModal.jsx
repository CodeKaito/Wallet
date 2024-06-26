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
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { incomeData, expensesData } from "../data";
import { CloseIcon } from "../icons";

const UpdateModal = ({ open, onClose, transaction, onUpdateSuccess }) => {
  const { userData } = useUser();
  const [formData, setFormData] = useState({
    user: "",
    amount: "",
    note: "",
    type: "",
    category: "",
    label: "",
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        user: transaction.user || "",
        amount: transaction.amount || "",
        note: transaction.note || "",
        type: transaction.type || "",
        category: transaction.category || "",
        label: transaction.label || "",
      });
    }
  }, [transaction]);

  useEffect(() => {
    if (userData && userData._id) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        user: userData._id,
      }));
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        user: formData.user,
        amount: formData.amount,
        type: formData.type,
        category: formData.category,
        label: formData.label,
        note: formData.note,
      };

      const response = await fetch(
        `http://localhost:5000/api/payment/${transaction._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const paymentData = await response.json();
      if (response.ok) {
        console.log("response.ok: ", paymentData);
        onUpdateSuccess();
        onClose();
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

  const data = formData.type === "Expenses" ? expensesData : incomeData;

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
          Update Transaction
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box className="mt-5">
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">
                Amount
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">€</InputAdornment>
                }
                label="Amount"
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                inputProps={{ min: 0, step: 0.01 }}
              />
            </FormControl>
          </Box>
          <Box className="mt-5">
            <FormControl fullWidth>
              <InputLabel id="type">Type</InputLabel>
              <Select
                labelId="type"
                id="type"
                name="type"
                value={formData.type}
                label="type"
                onChange={handleChange}
                disabled={!!formData.category}
              >
                <MenuItem value="Income">Income</MenuItem>
                <MenuItem value="Expenses">Expenses</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box className="mt-5">
            <FormControl fullWidth>
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="category"
                id="category"
                name="category"
                value={formData.category}
                label="Category"
                onChange={handleChange}
                disabled={!!formData.type && !!formData.label}
              >
                <MenuItem value="">Select Category</MenuItem>
                {Object.keys(data).map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box className="mt-5">
            <FormControl fullWidth>
              <InputLabel id="label">Label</InputLabel>
              <Select
                labelId="label"
                id="label"
                name="label"
                value={formData.label}
                label="Label"
                onChange={handleChange}
                disabled={!formData.category}
              >
                <MenuItem value="">Select Subcategory</MenuItem>
                {formData.category &&
                  data[formData.category].map((subcategory) => (
                    <MenuItem key={subcategory} value={subcategory}>
                      {subcategory}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
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
          </Box>

          <Button type="submit" variant="contained" color="primary">
            Save changes
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateModal;
