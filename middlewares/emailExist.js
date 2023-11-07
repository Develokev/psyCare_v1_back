const { getPatientByEmailMod } = require("../models/userModel");
const bcrypt = require("bcrypt");

const checkEmail = async (req, res, next) => {
  const { email, password } = req.body;

  const emailExists = await getPatientByEmailMod(email);

  // Si rowCount == 1 significa que hay un usuario con ese email ya creado
  if (emailExists.rowCount == 1) {
    res.status(400).json({
      ok: false,
      msg: "Email already exists, unable to create new user",
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    req.body.password = hashedPassword;

    next();
  }
};

module.exports = { checkEmail };
