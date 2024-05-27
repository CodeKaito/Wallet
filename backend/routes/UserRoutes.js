const { Router } = require("express");
const { authMiddleware } = require("../middlewares/authentication");
const passport = require("passport");

const {
  getUsers,
  login,
  getMyProfile,
  getUserDetails,
  saveUser,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");

const router = Router();

router
  .get("/users", getUsers)
  .post("/login", login)
  .get("/me", authMiddleware, getMyProfile)
  .get("/users/:id", getUserDetails)
  .post("/users", saveUser)
  .put("/users/:id", updateUser)
  .delete("/users/:id", deleteUser)

  .get(
    "/googleLogin",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  )
  .get(
    "/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
      try {
        res.redirect(
          `https://localhost:5173/?accessToken=${req.user.accessToken}`
        );
        console.log("login success");
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    }
  );

module.exports = router;
