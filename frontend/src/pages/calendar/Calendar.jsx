import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import { Header } from "../../components";
import CalendarModal from "./CalendarModal";

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/payments");
        if (!response.ok) {
          throw new Error("Failed to fetch payments");
        }
        const payments = await response.json();

        const events = payments.map((payment) => ({
          id: payment._id,
          title:
            payment.type === "Income"
              ? `+${payment.amount}`
              : `-${payment.amount}`,
          subtitle: payment.category,
          type: payment.type,
          start: payment.date,
        }));
        setCurrentEvents(events);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  const handleDateClick = (arg) => {
    setSelectedDate(arg);
    setOpenModal(true);
  };

  const handleSaveEvent = () => {
    if (selectedDate && eventTitle) {
      const calendarApi = selectedDate.view.calendar;
      calendarApi.unselect();
      calendarApi.addEvent({
        id: `${selectedDate.dateStr}-${eventTitle}`,
        title: eventTitle,
        start: selectedDate.startStr,
        end: selectedDate.endStr,
      });
      setOpenModal(false);
      setEventTitle("");
    }
  };

  const handleEventClick = (arg) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${arg.event.title}'`
      )
    ) {
      arg.event.remove();
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEventTitle("");
  };

  return (
    <Box m="20px">
      <Header title="Calendar" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          p="15px"
          borderRadius="4px"
          className="hidden lg:block"
          sx={{
            maxHeight: "75vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event, index) => (
              <ListItem
                key={`${event.id}-${index}`}
                sx={{
                  backgroundColor: "#141B2D",
                  color: "#FFFFFF",
                  padding: "10px",
                  border: "1px solid #141B2D",
                  borderRadius: "10px",
                  margin: "10px 0",
                }}
              >
                <ListItemText
                  className="flex"
                  primary={
                    <Box>
                      <Typography>{event.subtitle}</Typography>
                      <Typography
                        color="rgb(209, 209, 209)"
                        variant="body2"
                        sx={{ fontSize: "0.8rem" }}
                      >
                        {formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box color="white" marginLeft="20px">
                      <Typography>{event.title}€</Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Container>
          <Box
            flex="1 2 100%"
            ml="15px"
            sx={{ display: "grid", gridTemplateColumns: "1fr" }}
          >
            <FullCalendar
              height="75vh"
              width="50vh"
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "title",
                center: "prev,next today",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateClick}
              eventClick={handleEventClick}
              events={currentEvents}
              eventContent={({ event }) => {
                return (
                  <Container>
                    <Box
                      bgcolor={
                        event.extendedProps.type === "Income"
                          ? "#4CAF50"
                          : "#F44336"
                      }
                      borderRadius="12px"
                      color="#FFFFFF"
                      paddingX="25px"
                    >
                      {event.title}€
                    </Box>
                  </Container>
                );
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* MODAL FOR ADDING EVENT */}
      {/* <Modal open={openModal} onClose={handleCloseModal}>
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
      </Modal> */}

      <CalendarModal
        open={openModal}
        onClose={handleCloseModal}
        eventTitle={eventTitle}
        setEventTitle={setEventTitle}
        handleSaveEvent={handleSaveEvent}
      />
    </Box>
  );
};

export default Calendar;
