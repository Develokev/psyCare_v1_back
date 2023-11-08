const bcrypt = require("bcrypt");

const encryptPass = async (req,res,next) => {
    const { password } = req.body;

    if(!req.body) {
        res.status(401).json({
            ok: false,
            msg: 'Encrypting password FAILED'
        })
    } else {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        req.body.password = hashedPassword;
    }
    next();
}

module.exports = {
    encryptPass
}