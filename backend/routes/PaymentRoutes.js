const { Router } = require("express");

const {
  getPayments,
  getPaymentDetails,
  createPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/PaymentController");

const router = Router();

router
  .get("/payments", getPayments)
  .get("/payment/:id", getPaymentDetails)
  .post("/payment", createPayment)
  .put("/payment/:id", updatePayment)
  .delete("/payment/:id", deletePayment);

module.exports = router;
