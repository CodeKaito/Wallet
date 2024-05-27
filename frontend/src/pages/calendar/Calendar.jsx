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
  Typography,
  Modal,
  Button,
} from "@mui/material";
import { useUser } from "../../context/UserContext";
import { Header } from "../../components";
import CalendarModal from "./CalendarModal";
import { CloseIcon } from "../../icons";

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { userData } = useUser();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const eventsResponse = await fetch("http://localhost:5000/api/events");
      const paymentsResponse = await fetch(
        "http://localhost:5000/api/payments"
      );

      if (!eventsResponse.ok || !paymentsResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const events = await eventsResponse.json();

      const updatedEvents = events.map((event) => ({
        id: event._id,
        title: event.title,
        start: event.start,
      }));

      const payments = await paymentsResponse.json();

      const paymentEvents = payments.map((payment) => ({
        id: payment._id,

        title:
          payment.type === "Income"
            ? `+${payment.amount}`
            : `-${payment.amount}`,
        subtitle: payment.category,
        type: payment.type,
        start: payment.date,
      }));

      setCurrentEvents([...updatedEvents, ...paymentEvents]);
      console.log(currentEvents);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDateClick = (arg) => {
    setSelectedDate(arg);
    setOpenAddModal(true);
  };

  const handleSaveEvent = async () => {
    if (selectedDate && eventTitle) {
      const event = {
        user: userData._id,
        title: eventTitle,
        start: selectedDate.startStr,
      };

      try {
        const response = await fetch("http://localhost:5000/api/event", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        });

        console.log(event);

        if (!response.ok) {
          throw new Error("Failed to save event");
        }

        await fetchAllData();

        setOpenAddModal(false);
        setEventTitle("");
      } catch (error) {
        console.error("Error saving event:", error);
      }
    }
  };

  const handleEventClick = (arg) => {
    console.log(arg);
    setSelectedEvent(arg.event);
    setOpenDetailsModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setEventTitle("");
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = async () => {
    if (selectedEvent) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/event/${selectedEvent.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete event");
        }

        await fetchAllData();
        setOpenDetailsModal(false);
        setSelectedEvent(null);
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
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
                <Box width="100%">
                  <Box>
                    <Typography>{event.subtitle}</Typography>
                  </Box>
                  <Box color="white">
                    <Typography>
                      {event.type === "Expenses" || event.type === "Income"
                        ? `${event.title}€`
                        : event.title}
                    </Typography>
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
                </Box>
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
                        event.extendedProps.type
                          ? event.extendedProps.type === "Income"
                            ? "#4CAF50"
                            : "#F44336"
                          : "#141B2D"
                      }
                      borderRadius="12px"
                      color="#FFFFFF"
                      paddingX="25px"
                    >
                      <Typography>
                        {event.extendedProps.type
                          ? `${event.title.slice(0, 5)}€`
                          : event.title.slice(0, 5)}
                        {event.title.length > 20 ? "..." : ""}
                      </Typography>
                    </Box>
                  </Container>
                );
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* MODAL FOR ADDING EVENT */}
      <CalendarModal
        open={openAddModal}
        onClose={handleCloseAddModal}
        eventTitle={eventTitle}
        setEventTitle={setEventTitle}
        handleSaveEvent={handleSaveEvent}
      />

      {/* MODAL FOR EVENT DETAILS */}
      <Modal open={openDetailsModal} onClose={handleCloseDetailsModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "12px",
          }}
        >
          <Box mb={2}>
            <CloseIcon
              className="cursor-pointer"
              onClick={handleCloseDetailsModal}
            />
          </Box>

          {selectedEvent && (
            <Container>
              <Box marginX="40px">
                <Typography variant="h5">
                  {formatDate(selectedEvent.start, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
                <Typography variant="h5" display="flex" justifyContent="center">
                  {!selectedEvent.extendedProps.type
                    ? "Task: " + selectedEvent.title
                    : selectedEvent.extendedProps.type === "Expenses"
                    ? "Expenses: " + selectedEvent.title + "€"
                    : "Income: " + selectedEvent.title + "€"}
                </Typography>
                {selectedEvent.extendedProps.subtitle && (
                  <Typography
                    variant="body1"
                    display="flex"
                    justifyContent="center"
                  >
                    Reason: {selectedEvent.extendedProps.subtitle}
                  </Typography>
                )}
                {!selectedEvent.extendedProps.type && (
                  <>
                    <Box marginTop="20px">
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleDeleteEvent}
                        sx={{
                          "&:hover": {
                            backgroundColor: "error.main",
                            borderColor: "error.main",
                            color: "white",
                            variant: "contained",
                          },
                        }}
                      >
                        Delete task
                      </Button>
                    </Box>
                  </>
                )}
              </Box>
            </Container>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Calendar;
