import React, { useState, useEffect } from "react";
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
import { useUser } from "../context/UserContext";
import { useSavingData } from "../context/SavingContext";
import { CloseIcon } from "../icons";

const AddSavingsModal = ({ open, onClose }) => {
  const { userData } = useUser();
  const { refreshSavingData } = useSavingData();
  const [formData, setFormData] = useState({
    user: "",
    amount: "",
  });
  const [existingSaving, setExistingSaving] = useState(null);

  useEffect(() => {
    const fetchExistingSaving = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/saving");
        if (response.ok) {
          const data = await response.json();
          const savingData = data.filter(
            (data) => data.user._id === userData._id
          );
          setExistingSaving(savingData);
        } else {
          throw new Error("Failed to fetch existing saving data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchExistingSaving();
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
    if (existingSaving && existingSaving.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        amount: existingSaving[0].amount,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        amount: "",
      }));
    }
  }, [existingSaving]);

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

      const method =
        existingSaving && existingSaving.length > 0 ? "PUT" : "POST";
      const url =
        existingSaving && existingSaving.length > 0
          ? `http://localhost:5000/api/saving/${existingSaving[0]._id}`
          : "http://localhost:5000/api/saving";

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
        refreshSavingData(); // Refresh data after successful save
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
          {existingSaving && existingSaving.length > 0
            ? "Edit Saving"
            : "Add a Saving"}
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
            {existingSaving && existingSaving.length > 0 ? "Update" : "Submit"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddSavingsModal;
