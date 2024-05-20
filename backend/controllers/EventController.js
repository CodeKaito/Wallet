// controllers/EventController.js
const EventModel = require("../models/EventModel");

module.exports.getEvents = async (req, res, next) => {
  try {
    const events = await EventModel.find();
    res.status(200).send(events);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      stack: error.stack,
      msg: "Something went wrong!",
    });
    next(error);
  } finally {
    console.log("From getEvents: Event retrieval process completed.");
  }
};

module.exports.getEventDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const event = await EventModel.findById(id);
    res.status(200).send(event);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      stack: error.stack,
      msg: "Something went wrong!",
    });
    next(error);
  } finally {
    console.log(
      "From getEventDetails: Event detail retrieval process completed."
    );
  }
};

module.exports.createEvent = async (req, res, next) => {
  try {
    const eventData = req.body;
    const event = await EventModel.create(eventData);
    res.status(200).send({
      message: "Event created successfully",
      eventId: event._id,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      stack: error.stack,
      msg: "Something went wrong!",
    });
    next(error);
  } finally {
    console.log("From createEvent: Event creation process completed.");
  }
};

module.exports.updateEvent = async (req, res, next) => {
  const { id } = req.params;
  const eventData = req.body;
  try {
    const event = await EventModel.findByIdAndUpdate(id, eventData, {
      new: true,
    });
    res.status(200).send(event);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      stack: error.stack,
      msg: "Something went wrong!",
    });
    next(error);
  } finally {
    console.log("From updateEvent: Event update process completed.");
  }
};

module.exports.deleteEvent = async (req, res, next) => {
  const { id } = req.params;
  try {
    const event = await EventModel.findByIdAndDelete(id);
    res.status(200).send(event);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      stack: error.stack,
      msg: "Something went wrong!",
    });
    next(error);
  } finally {
    console.log("From deleteEvent: Event deletion process completed.");
  }
};
