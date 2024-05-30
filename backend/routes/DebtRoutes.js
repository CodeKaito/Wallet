const { Router } = require("express");

const {
  getDebt,
  getDebtDetails,
  createDebt,
  updateDebt,
  deleteDebt,
} = require("../controllers/DebtController");

const router = Router();

router
  .get("/debt", getDebt)
  .get("/debt/:id", getDebtDetails)
  .post("/debt", createDebt)
  .put("/debt/:id", updateDebt)
  .delete("/debt/:id", deleteDebt);

module.exports = router;
