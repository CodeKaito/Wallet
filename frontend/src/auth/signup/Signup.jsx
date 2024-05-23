import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import CloseIcon from "@mui/icons-material/Close";
import GoogleLogin from "../googleLogin/GoogleLogin";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  textAlign: "center",
  p: 4,
};

const Signup = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    avatar: "",
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("surname", formData.surname);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("avatar", formData.avatar);

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        console.log("Signup successful!");
        onClose();
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          id="login-modal-title"
          variant="h5"
          component="h5"
          display="flex"
          justifyContent="center"
        >
          Signup
        </Typography>
        <form className="mt-5" onSubmit={handleSubmit}>
          <MuiFileInput
            className="rounded-full"
            label="avatar"
            autoFocus
            id="avatar"
            onChange={handleChange}
          />
          <Box display="flex" justifyContent="center" gap={1}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="surname"
              label="Surname"
              name="surname"
              autoComplete="surname"
              value={formData.surname}
              onChange={handleChange}
            />
          </Box>

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Signup
          </Button>
        </form>
        <Box display="flex" justifyContent="center">
          <GoogleLogin />
        </Box>
      </Box>
    </Modal>
  );
};

export default Signup;
