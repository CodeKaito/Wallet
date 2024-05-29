const { Router } = require("express");

const {
  getSaving,
  getSavingDetails,
  createSaving,
  updateSaving,
  deleteSaving,
} = require("../controllers/SavingController");

const router = Router();

router
  .get("/saving", getSaving)
  .get("/saving/:id", getSavingDetails)
  .post("/saving", createSaving)
  .put("/saving/:id", updateSaving)
  .delete("/saving/:id", deleteSaving);

module.exports = router;
