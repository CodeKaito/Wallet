import {
  Box,
  Button,
  Typography,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  Modal,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { CloseIcon } from "../icons";

const AddDebtModal = ({ open, onClose }) => {
  const { userData } = useUser();
  const [formData, setFormData] = useState({
    user: "",
    amount: "",
  });
  const [existingDebt, setExistingDebt] = useState(null);

  useEffect(() => {
    const fetchExistingDebt = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/debt");
        if (response.ok) {
          const data = await response.json();
          const debtData = data.filter(
            (data) => data.user._id === userData._id
          );
          setExistingDebt(debtData);
        } else {
          throw new Error("Failed to fetch existing debt data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchExistingDebt();
  }, []);

  useEffect(() => {
    if (userData && userData._id) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        user: userData._id,
      }));
    }
  }, [userData]);

  useEffect(() => {
    if (existingDebt && existingDebt.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        amount: existingDebt[0].amount,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        amount: "",
      }));
    }
  }, [existingDebt]);

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
      };

      const method = existingDebt && existingDebt.length > 0 ? "PUT" : "POST";
      const url =
        existingDebt && existingDebt.length > 0
          ? `http://localhost:5000/api/debt/${existingDebt[0]._id}`
          : "http://localhost:5000/api/debt";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();
      if (response.ok) {
        console.log("Response:", responseData);
      } else {
        console.error("Error:", responseData);
        throw new Error("Failed to save data");
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
          {existingDebt && existingDebt.length > 0 ? "Edit Debt" : "Add a Debt"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box className="my-5">
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
                inputProps={{ min: 0, step: 1 }}
              />
            </FormControl>
          </Box>

          <Button type="submit" variant="contained" color="primary">
            {existingDebt && existingDebt.length > 0 ? "Update" : "Submit"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddDebtModal;
