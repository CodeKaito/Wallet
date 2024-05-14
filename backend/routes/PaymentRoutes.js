// Importa il modulo Router da Express per gestire le route
const { Router } = require("express");

// Importa i controller necessari per gestire le richieste relative ai commenti
const {
  getPayments,
  getPaymentDetails,
  createPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/PaymentController");

// Crea un'istanza di Router di Express
const router = Router();

// Definisci le route utilizzando il metodo corrispondente del router e associa ciascuna a una funzione del controller
router
  .get("/payments", getPayments) // Route per ottenere tutti i pagamenti in base all'id di un post specifico
  .get("/payments/:id", getPaymentDetails) // Route per ottenere un pagamento specifico relativo a un post specifico
  .post("/payments/:id", createPayment) // Route per salvare un nuovo pagamento
  .put("/payments/:id", updatePayment) // Route per aggiornare un pagamento esistente in base all'ID
  .delete("/payments/:id", deletePayment); // Route per eliminare un pagamento esistente in base all'ID

// Esporta il router per renderlo disponibile ad altri moduli
module.exports = router;
