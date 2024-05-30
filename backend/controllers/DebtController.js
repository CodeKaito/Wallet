const DebtModel = require("../models/DebtModel");

module.exports.getDebt = async (req, res, next) => {
  try {
    const debts = await DebtModel.find().populate("user");
    res.status(200).send(debts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      stack: error.stack,
      msg: "Something went wrong!",
    });
    next(error);
  } finally {
    console.log("From getDebt: Debt retrieval process completed.");
  }
};

module.exports.getDebtDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const debt = await DebtModel.findById(id).populate("user");
    res.status(200).send(debt);
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
      "From getDebtDetails: Debt detail retrieval process completed."
    );
  }
};

module.exports.createDebt = async (req, res, next) => {
  try {
    const debtData = req.body;
    const debt = await DebtModel.create(debtData);
    res.status(200).send({
      message: "Debt created successfully",
      debtId: debt._id,
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
    console.log("From createDebt: Debt creation process completed.");
  }
};

module.exports.updateDebt = async (req, res, next) => {
  const { id } = req.params;
  const debtData = req.body;
  try {
    const debt = await DebtModel.findByIdAndUpdate(id, debtData, {
      new: true,
    });
    res.status(200).send(debt);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      stack: error.stack,
      msg: "Something went wrong!",
    });
    next(error);
  } finally {
    console.log("From updateDebt: Debt update process completed.");
  }
};

module.exports.deleteDebt = async (req, res, next) => {
  const { id } = req.params;
  try {
    const debt = await DebtModel.findByIdAndDelete(id);
    res.status(200).send(debt);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      stack: error.stack,
      msg: "Something went wrong!",
    });
    next(error);
  } finally {
    console.log("From deleteDebt: Debt deletion process completed.");
  }
};
