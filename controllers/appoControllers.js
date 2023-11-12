const {
  getAllAppoMod,
  appoByUserIdMod,
  createAppoMod,
  updateAppoMod,
  deleteAppoMod,
  appoByStatusMod,
  appoByStatusByUserMod,
  changeStatusMod
} = require("../models/appoModel");

//Appointments model CRUD

const getAllAppoControl = async (req, res) => {
  let data;

  try {
    data = await getAllAppoMod();

    if (data) {
      return res.status(200).json({
        ok: true,
        data: data.rows,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "all appo controller FAILED, please contact Admin",
    });
  }
};

const appoByUserIdControl = async (req, res) => {
  let data, id;
  id = req.params.id;

  try {
    if (id > 1) {
      data = await appoByUserIdMod(id);
      return res.status(200).json({
        ok: true,
        data: data.rows,
      });
    } else {
      return res.status(400).json({
        ok: false,
        msg: "user ID unavailable, check data",
      });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "getting appo by user ID controller FAILED, please contact ADMIN",
    });
  }
};

const createAppoControl = async (req, res) => {
  let data, id;
  id = req.params.id;

  const appoRole = {
    user_id: id,
    appoStatus: "pending",
    ...req.body,
  };

  try {
    data = await createAppoMod(appoRole);
    return res.status(200).json({
      ok: true,
      data: data.rowCount,
      msg: "if data = 1, appo successfully created",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "creating appo controller FAILED, please contact ADMIN",
    });
  }
};

const updateAppoControl = async (req, res) => {
  let data, appo_id;
  appo_id = req.params.id;
  const updateData = req.body;

  try {
    data = await updateAppoMod(updateData, appo_id);
    return res.status(200).json({
      ok: true,
      data: data.rowCount,
      msg: "if data = 1, data successfully updated",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "updating appo controller FAILED, please contact ADMIN",
    });
  }
};

const deleteAppoControl = async (req, res) => {
  let data, appo_id;
  appo_id = req.params.id;

  try {
    data = await deleteAppoMod(appo_id);
    return res.status(200).json({
      ok: true,
      data: data.rowCount,
      msg: "if data = 1, appo successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "deleting appo controller FAILED, please contact ADMIN",
    });
  }
};

//Appointment Status READ - UPDATE

const appoByStatusControl = async (req, res) => {
  let data;
  const status = req.body.status

  try {
    data = await appoByStatusMod(status);
    return res.status(200).json({
      ok: true,
      msg: `filtered by status ${status} correctly`,
      data: data.rows
    })
  } catch (error) {
    return res.status(200).json({
      ok: false,
      msg: `appo by status controller FAILED, pleasse contact ADMIN`
    })
  }
};

const appoByStatusByUserControl = async (req, res) => {
  let data;
  const user_id = req.params.id
  const status = req.body.status

  try {
    data = await appoByStatusByUserMod(user_id, status)
    return res.status(200).json({
      ok: true,
      msg: `appo by status ${status} by user_id retrieved successfully`,
      data: data.rows
    })
  } catch (error) {
    return res.status(200).json({
      ok: false,
      mg: 'appo by status by user_id controller FAILED, please contact ADMIN'
    })
  }
}

const changeStatusControl = async (req, res) => {
  let data;

  const appo_id = req.body.appo_id
  const newStatus = req.body.status

  try {
    data = await changeStatusMod(newStatus, appo_id);
    return res.status(200).json({
      ok: true,
      data: data.rowCount,
      msg: "if data = 1, status successfully updated",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "change status controller FAILED, please contact ADMIN",
    });
  }

}

module.exports = {
  getAllAppoControl,
  appoByUserIdControl,
  createAppoControl,
  updateAppoControl,
  deleteAppoControl,
  appoByStatusControl,
  appoByStatusByUserControl,
  changeStatusControl
};
