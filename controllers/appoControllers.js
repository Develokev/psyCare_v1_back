const {
    getAllAppoMod,
    appoByUserIdMod,
    createAppoMod

} = require('../models/appoModel')

const getAllAppoControl = async (req, res) => {

    let data;

    try {
        data = await getAllAppoMod()

        if (data) {
            return res.status(200).json({
                ok: true,
                data: data.rows
            })
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'all appo controller FAILED, please contact Admin'
        })
    }
}

const appoByUserIdControl = async (req, res) => {

    let data, id;
    id = req.params.id;

    try {
        if (id > 1) {
        data = await appoByUserIdMod(id)
        return res.status(200).json({
            ok: true,
            data: data.rows
        })
        }else {
        return res.status(400).json({
            ok: false,
            msg: 'user ID unavailable, check data'
        })}
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'getting appo by user ID FAILED, please contact ADMIN'
        })
    }
}

const createAppoControl = async (req, res) => {

    let data, id;
    id = req.params.id

    const appoRole = {
        user_id : id,
        appoStatus : 'pending',
        ...req.body
    }
    
    try {
        data = await createAppoMod(appoRole)
        return res.status(200).json({
            ok: true,
            data: data.rowCount
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'creating appo FAILED, please contact ADMIN'
        })
    }
}

module.exports = {
    getAllAppoControl,
    appoByUserIdControl,
    createAppoControl
}