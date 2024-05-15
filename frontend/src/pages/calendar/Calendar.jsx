import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Header } from "../../components";

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [initialView, setInitialView] = useState("dayGridMonth");

  const handleDateClick = (arg) => {
    const title = prompt("Enter a new title for the calendar");
    const calendarApi = arg.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${arg.dateStr}-${title}`,
        title,
        start: arg.startStr,
        end: arg.endStr,
        allDay: arg.allDay,
      });
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

  //   useEffect(() => {
  //     const handleSize = () => {
  //       if (window.innerWidth < 800) {
  //         setInitialView("timeGridDay");
  //         console.log("Sono nell'if");
  //       } else {
  //         setInitialView("dayGridMonth");
  //       }
  //     };
  //     window.addEventListener("resize", handleSize);
  //   }, []);

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          p="15px"
          borderRadius="4px"
          className="hidden lg:block"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
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
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
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
              eventsSet={(events) => setCurrentEvents(events)}
            />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Calendar;
