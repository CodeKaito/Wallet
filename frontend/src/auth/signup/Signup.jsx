import React, { useState, useRef } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Input,
} from "@mui/material";
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
  const inputFileRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
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

  const handleClick = () => {
    inputFileRef.current.click();
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
          {formData.avatar ? (
            <Box display="flex" justifyContent="center">
              <Box
                width="100px"
                height="100px"
                className="group"
                position="relative"
              >
                <Button
                  variant="contained"
                  color="error"
                  className="bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100"
                  onClick={() => setFormData({ ...formData, avatar: "" })}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  Remove
                </Button>
                <img
                  src={URL.createObjectURL(formData.avatar)}
                  alt="avatar"
                  className="rounded-full w-full h-full object-cover"
                />
              </Box>
            </Box>
          ) : (
            <>
              <Input
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                name="avatar"
                onChange={handleChange}
                inputRef={inputFileRef}
                variant="filled"
                required
              />

              <Button
                color="primary"
                variant="contained"
                component="span"
                onClick={handleClick}
              >
                Upload avatar
              </Button>
            </>
          )}

          {/* <Input
            type="file"
            accept="image/*"
            name="avatar"
            onChange={handleChange}
            variant="filled"
            required
          /> */}
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
