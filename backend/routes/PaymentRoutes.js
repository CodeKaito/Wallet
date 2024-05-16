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
  .get("/payments/:id", getPaymentDetails)
  .post("/payments", createPayment)
  .put("/payments/:id", updatePayment)
  .delete("/payments/:id", deletePayment);

module.exports = router;
