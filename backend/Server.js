const express = require("express"); // Importa il framework Express per gestire le richieste HTTP
const mongoose = require("mongoose"); // Importa il modulo mongoose per interagire con il database MongoDB
const cors = require("cors"); // Importa il modulo cors per interagire con il frontend
const fs = require("fs"); // Importa il modulo fs per la lettura dei file
require("dotenv").config(); // Configurazione dotenv per caricare le variabili d'ambiente

const UserRoutes = require("./routes/UserRoutes"); // Importa le route necessarie per le chiamate HTTP degli utenti
const PaymentRoutes = require("./routes/PaymentRoutes"); // Importa le route necessarie per le chiamate HTTP dei payment

const PORT = process.env.PORT || 5001; // Imposta la porta del server di default a 5000, se la 5000non é disponibile allora utilizza la 5001
const db = process.env.MONGO_URI; // Imposto una costante dove inserisco l'endpoint del mongodb

const app = express(); // Crea un'app Express
app.use(express.json()); // Middleware per il parsing del corpo della richiesta come JSON

app.use(cors());

const startServer = async () => {
  try {
    await mongoose.connect(db); // Connessione con il database
    // Avvio del server sulla porta specificata
    app.listen(PORT, () => {
      console.log(`Connected to MongoDB & listening on port ${PORT}`); // Consollogga la porta del server per il quale é in ascolto,
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error); // Gestione degli errori di connessione al database
  }
};

startServer();

app.use("/api", UserRoutes); // Utilizza le route definite nel file UserRoutes per gli endpoint API
app.use("/api", PaymentRoutes); // Utilizza le route definite nel file PaymentRoutes per gli endpoint API

// Route di base per controllare se il server è attivo
app.get("/", (req, res) => {
  // Leggi il file HTML e invialo come risposta
  fs.readFile("./pages/Server.html", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(data); // Invia il contenuto del file HTML come risposta
    }
  });
});
