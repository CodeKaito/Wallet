const PaymentModel = require("../models/PaymentModel");

module.exports.getPayments = async (req, res, next) => {
  try {
    const payments = await PaymentModel.find();
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
    const payment = await PaymentModel.findById(id);
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

module.exports.createPayment = async (req, res, next) => {};

module.exports.updatePayment = async (req, res, next) => {};

module.exports.deletePayment = async (req, res, next) => {};
