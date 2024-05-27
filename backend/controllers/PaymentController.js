const PaymentModel = require("../models/PaymentModel");

module.exports.getPayments = async (req, res, next) => {
  try {
    const payments = await PaymentModel.find().populate("user");
    res.status(200).send(payments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      stack: error.stack,
      msg: "Something went wrong!",
    });
    next(error);
  } finally {
    console.log("From getPayments: Payments retrieval process completed.");
  }
};

module.exports.getPaymentDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const payment = await PaymentModel.findById(id).populate("user");
    res.status(200).send(payment);
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
      "From getPaymentDetails: Payment detail retrieval process completed."
    );
  }
};

module.exports.createPayment = async (req, res, next) => {
  try {
    const paymentData = req.body;
    const payment = await PaymentModel.create(paymentData);
    res.status(200).send({
      message: "Payment created successfully",
      paymentId: payment._id,
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
    console.log("From createPayment: Payment creation process completed.");
  }
};

module.exports.updatePayment = async (req, res, next) => {
  const { id } = req.params;
  const paymentData = req.body;
  try {
    const payment = await PaymentModel.findByIdAndUpdate(id, paymentData, {
      new: true,
    });
    res.status(200).send(payment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      stack: error.stack,
      msg: "Something went wrong!",
    });
    next(error);
  } finally {
    console.log("From updatePayment: Payment update process completed.");
  }
};

module.exports.deletePayment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const payment = await PaymentModel.findByIdAndDelete(id);
    res.status(200).send(payment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      stack: error.stack,
      msg: "Something went wrong!",
    });
    next(error);
  } finally {
    console.log("From deletePayment: Payment deletion process completed.");
  }
};
