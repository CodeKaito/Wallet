const { generateJWT } = require("../middlewares/authentication");
const cloudinaryUserMiddleware = require("../middlewares/multerUser.js");
const bcrypt = require("bcryptjs");
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

module.exports.login = async (req, res, next) => {
  try {
    let userFound = await UserModel.findOne({
      email: req.body.email,
    }).select("+password");

    if (userFound) {
      const isPasswordMatching = await bcrypt.compare(
        req.body.password,
        userFound.password
      );

      if (isPasswordMatching) {
        const token = await generateJWT({
          id: userFound._id,
        });

        res.json({
          email: userFound.email,
          id: userFound._id,
          token,
        });
      } else {
        res.status(401).send("Wrong email or password");
      }
    } else {
      res.status(401).send("Wrong email or password");
    }
  } catch (err) {
    next(err);
  }
};

module.exports.getMyProfile = async (req, res) => {
  try {
    let user = await UserModel.findById(req.user.id);

    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "Profilo autore non trovato" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    console.error("Errore durante il recupero del profilo dell'autore:", error);
    res.status(500).json({
      message:
        "Si è verificato un errore durante il recupero del profilo dell'autore",
    });
  }
};

const defaultAvatarUrl =
  "https://res.cloudinary.com/dkj3atfao/image/upload/v1716812728/users/x2gbjdreqfspgokuevtd.jpg";

module.exports.saveUser = async (req, res, next) => {
  try {
    cloudinaryUserMiddleware(req, res, async () => {
      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const avatar = req.file ? req.file.path : defaultAvatarUrl;
      const newUser = await UserModel.create({
        ...req.body,
        password: hashedPassword,
        avatar: avatar,
      });

      console.log("Saved successfully, author: " + newUser);
      res.status(201).send(newUser);
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
    console.log(`User creation process completed.`);
  }
};

module.exports.updateUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    // Esegui il middleware di Cloudinary per caricare l'avatar
    cloudinaryUserMiddleware(req, res, async () => {
      const body = req.body;
      console.log(body);
      const { password } = req.body;
      // Password crittografata
      let hashedPassword;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      // Trova l'autore nel database
      const existingUser = await UserModel.findById(id);
      if (!existingUser) {
        return res.status(404).send("User not found");
      }

      let updatedAvatar = existingUser.avatar;
      if (req.file) {
        updatedAvatar = req.file.path;
      } else if (req.file === null) {
        updatedAvatar = existingUser.avatar;
      }

      // Costruisce un oggetto con i campi da aggiornare
      const fieldsToUpdate = {
        name: req.body.name || existingUser.name,
        surname: req.body.surname || existingUser.surname,
        email: req.body.email || existingUser.email,
        password: hashedPassword || existingUser.password,
        avatar: updatedAvatar,
      };

      // Aggiorna l'URL dell'avatar dell'autore nel database
      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        fieldsToUpdate,
        { new: true }
      );
      if (!updatedUser) {
        // Se l'autore non è stato trovato, restituisci un messaggio di errore
        return res.status(404).send("User not found");
      }
      // Invia una conferma di aggiornamento con i dettagli dell'autore aggiornati
      res.send("Updated successfully, user: " + JSON.stringify(updatedUser));
    });
  } catch (error) {
    // Gestisci altri errori
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      msg: "Something went wrong!",
    });
    next(error);
  } finally {
    // Stampa a console il completamento del processo di aggiornamento dell'autore
    console.log(`User with id: ${id} update process completed.`);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await UserModel.findByIdAndDelete(id);
    res.send("Deleted successfully, user: " + JSON.stringify(id));
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      stack: error.stack,
      msg: "Something went wrong!",
    });
    next(error);
  } finally {
    console.log(`User with id: ${id} deletion process completed.`);
  }
};
