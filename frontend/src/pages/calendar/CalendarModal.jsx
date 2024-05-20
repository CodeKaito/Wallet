import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const EventModal = ({
  open,
  onClose,
  eventTitle,
  setEventTitle,
  handleSaveEvent,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          width: 400,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add Event
        </Typography>
        <TextField
          label="Event Title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={handleSaveEvent}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default EventModal;
