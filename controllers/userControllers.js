const {
    getAllPatientsMod,
    getPatientByEmailMod,
    createPatientMod,
    deletePatientMod,
    getPatientByIdMod,
    updatePatientMod

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
        role: 'patient',
        avatar: req.body.avatar || 'https://t.ly/SVHy',
        ...req.body
    }

    try {
            data = await createPatientMod(dataRole)
            res.status(200).json({
                ok: true,
                data
            })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'create patient controller FAILED, please contact ADMIN'
        })
    }
}

const deletePatientControl = async (req,res) => {

    let exist, data;
    const id = req.params.id

    try {
        exist = await getPatientByIdMod(id)

        if(exist.rowCount > 0) {
            data = await deletePatientMod(id)
            res.status(200).json({
                ok: true,
                data
            })
        } else {
            res.status(400).json({
                ok: false,
                msg: 'deleting patient FAILED'
            })
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'delete patient control FAILED, please contact ADMIN'
        })
    }
}

const updatePatientControl = async (req,res) => {

    let data, id;
    id = req.params.id;
    body = req.body;

    try {
        data = await updatePatientMod(id, body);

        if(data.rowCount > 0) {
            res.status(200).json({
                ok: true,
                msg: 'patient data updated correctly',
                data
            })
        } else {
            res.status(400).json({
                ok: false,
                msg: 'updating patient info FAILED'
            })
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'update patient model FAILED'
        })
    }
}


module.exports = {
    getAllPatientsControl,
    getPatientByEmailControl,
    createPatientControl,
    deletePatientControl,
    updatePatientControl
}