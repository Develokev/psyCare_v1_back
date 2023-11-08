const bcrypt = require('bcrypt');
const {loginModel} = require('../models/authModel')

const loginController = async (req,res) => {

    const {email,password} = req.body;

    try {
        const emailOk = await loginModel(email)

        if(!emailOk) {
            return res.status(404).json({
                ok:false,
                msg: 'Email-password incorrect'
            })
        }

        const loginPass = emailOk.password
        const checkPass = bcrypt.compareSync(password, loginPass)

        if(!checkPass) {
            return res.status(401).json({
                ok: false,
                msg: 'Email-password incorrect'
            })
        } else {
            return res.status(200).json({
                ok: true,
                msg: 'Login successfull'
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: 'login controller FAILED, please, contact ADMIN.'
        })
    }
}

module.exports = {
    loginController
}
