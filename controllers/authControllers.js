const bcrypt = require("bcrypt");
const { loginModel } = require("../models/authModel");
const { generateToken } = require("../helpers/generateJWT");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const emailOk = await loginModel(email);

    if (!emailOk) {
      return res.status(404).json({
        ok: false,
        msg: "Email-password incorrect",
      });
    }

    const loginPass = emailOk.password;
    const checkPass = bcrypt.compareSync(password, loginPass);

    if (!checkPass) {
      return res.status(401).json({
        ok: false,
        msg: "Email-password incorrect",
      });
    } else {
      const user = {
        name: emailOk.name,
        role: emailOk.role,
      };
      const token = await generateToken(user);

      return res.status(200).json({
        ok: true,
        msg: "Login successfull",
        token,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "login controller FAILED, please, contact ADMIN.",
    });
  }
};

module.exports = {
  loginController,
};
