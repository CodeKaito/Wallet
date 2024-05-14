const UserModel = require("../models/UserModel");

module.exports.getUsers = async (req, res, next) => {
  try {
    const Users = await UserModel.find();
    res.status(200).send(Users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      stack: error.stack,
      msg: "Something went wrong!",
    });
    next(error);
  } finally {
    console.log("From getUsers: Users retrieval process completed.");
  }
};

module.exports.getUserDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const User = await UserModel.findById(id);
    res.status(200).send(User);
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
      "From getUserDetails: User detail retrieval process completed."
    );
  }
};

// module.exports.createUser = async (req, res, next) => {};

// module.exports.updateUser = async (req, res, next) => {};

// module.exports.deleteUser = async (req, res, next) => {};
