const { Router } = require("express");

const {
  getEvents,
  getEventDetails,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/EventController");

const router = Router();

router
  .get("/events", getEvents)
  .get("/event/:id", getEventDetails)
  .post("/event", createEvent)
  .put("/event/:id", updateEvent)
  .delete("/event/:id", deleteEvent);

module.exports = router;
