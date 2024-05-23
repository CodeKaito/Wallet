// Importa il modulo Router da Express per gestire le route
const { Router } = require("express");

// Importa i controller necessari per gestire le richieste relative ai commenti
const {
  getUsers,
  getUsersDetails,
  saveUser,
  updateUsers,
  deleteUsers,
} = require("../controllers/UserController");

// Crea un'istanza di Router di Express
const router = Router();

// Definisci le route utilizzando il metodo corrispondente del router e associa ciascuna a una funzione del controller
router
  .get("/users", getUsers) // Route per ottenere tutti i pagamenti in base all'id di un post specifico
  .post("/login", login) // Route per ottenere il token di accesso
  .get("/me", authMiddleware, getMyProfile) // Route per ottenere il mio profilo
  .get("/users/:id", getUsersDetails) // Route per ottenere un pagamento specifico relativo a un post specifico
  .post("/users", saveUser) // Route per salvare un nuovo pagamento
  .put("/users/:id", updateUsers) // Route per aggiornare un pagamento esistente in base all'ID
  .delete("/users/:id", deleteUsers) // Route per eliminare un pagamento esistente in base all'ID

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

// Esporta il router per renderlo disponibile ad altri moduli
module.exports = router;
