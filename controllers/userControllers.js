const {
    getAllPatientsMod,
    getPatientByEmailMod,
    createPatientMod

} = require('../models/userModel')

const getAllPatientsControl = async (req,res) => {

    let data;

    try {
        data = await getAllPatientsMod()

        if(data) {
            return res.status(200).json({
                ok: true,
                data: data.rows
            })
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'all patients controller FAILED, please contact Admin'
        })
    }
}

const getPatientByEmailControl = async (req,res) => {

    let data;
    const email = req.params.email;

    try {
        if(email) {

            data = await getPatientByEmailMod(email)
            return res.status(200).json({
                ok: true,
                data: data.rows
            })
        }
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'patient by email controller FAILED, please contact ADMIN'
        })
    }
}

const createPatientControl = async (req,res) => {

    let data, dataRole;

    dataRole = {
        role: "patient",
        avatar: req.body.avatar || 'https://t.ly/SVHy',
        ...req.body
    }

    try {
        if(data) {

            data = await createPatientMod(dataRole)
            res.status(200).json({
                ok: true,
                data
            })
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'create patient controller FAILED, please contact ADMIN'
        })
    }
}

module.exports = {
    getAllPatientsControl,
    getPatientByEmailControl,
    createPatientControl
}