// Importa il modulo Router da Express per gestire le route
const { Router } = require("express");

// Importa i controller necessari per gestire le richieste relative ai commenti
const {
  getUsers,
  //   getUsersDetails,
  //   saveUsers,
  //   updateUsers,
  //   deleteUsers,
} = require("../controllers/UserController");

// Crea un'istanza di Router di Express
const router = Router();

// Definisci le route utilizzando il metodo corrispondente del router e associa ciascuna a una funzione del controller
router.get("/users", getUsers); // Route per ottenere tutti i pagamenti in base all'id di un post specifico
//   .get("/users/:id", getUsersDetails) // Route per ottenere un pagamento specifico relativo a un post specifico
//   .post("/users/:id", saveUsers) // Route per salvare un nuovo pagamento
//   .put("/users/:id", updateUsers) // Route per aggiornare un pagamento esistente in base all'ID
//   .delete("/users/:id", deleteUsers); // Route per eliminare un pagamento esistente in base all'ID

// Esporta il router per renderlo disponibile ad altri moduli
module.exports = router;
