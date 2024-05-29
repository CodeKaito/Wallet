const SavingModel = require("../models/SavingModel");

module.exports.getSaving = async (req, res, next) => {
  try {
    const saving = await SavingModel.find().populate("user");
    res.status(200).send(saving);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      stack: error.stack,
      msg: "Something went wrong!",
    });
    next(error);
  } finally {
    console.log("From getSaving: Saving retrieval process completed.");
  }
};

module.exports.getSavingDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const saving = await PaymentModel.findById(id).populate("user");
    res.status(200).send(saving);
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
      "From getSavingDetails: Saving detail retrieval process completed."
    );
  }
};

module.exports.createSaving = async (req, res, next) => {
  try {
    const savingData = req.body;
    const saving = await SavingModel.create(savingData);
    res.status(200).send({
      message: "Saving created successfully",
      savingId: saving._id,
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
    console.log("From createSaving: Saving creation process completed.");
  }
};

module.exports.updateSaving = async (req, res, next) => {
  const { id } = req.params;
  const savingData = req.body;
  try {
    const saving = await SavingModel.findByIdAndUpdate(id, savingData, {
      new: true,
    });
    res.status(200).send(saving);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      stack: error.stack,
      msg: "Something went wrong!",
    });
    next(error);
  } finally {
    console.log("From updateSaving: Saving update process completed.");
  }
};

module.exports.deleteSaving = async (req, res, next) => {
  const { id } = req.params;
  try {
    const saving = await SavingModel.findByIdAndDelete(id);
    res.status(200).send(saving);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      stack: error.stack,
      msg: "Something went wrong!",
    });
    next(error);
  } finally {
    console.log("From deleteSaving: Saving deletion process completed.");
  }
};
