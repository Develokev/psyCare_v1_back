const queries = {

//USERS CRUD

    allPatientsQuery:`
    SELECT u.user_id,u.name,u.last_name,u.email,u.avatar,u.register_date,roles.role
    FROM users AS u
    INNER JOIN roles ON u.role = roles.role
	WHERE roles.role = 'patient'`,

    patientByEmailQuery:`
    SELECT u.user_id,u.name,u.last_name,u.email,u.avatar,u.register_date,roles.role
    FROM users AS u
    INNER JOIN roles ON u.role = roles.role
	WHERE u.email=$1`,

    patientByIdQuery:`
    SELECT u.user_id,u.name,u.last_name,u.email,u.avatar,roles.role
    FROM users AS u
    INNER JOIN roles ON u.role = roles.role
	WHERE u.user_id=$1`,

    createPatientQuery:`
    INSERT INTO users (role, name, last_name, email, password, avatar)
    VALUES ($1, $2, $3, $4, $5, $6)`,

    updatePatientQuery:`
    UPDATE users
    SET name=$1, last_name=$2, email=$3, password=$4, avatar=$5
    WHERE user_id=$6`,

    deletePatientQuery:`
    DELETE FROM users
    WHERE user_id=$1`,

//APPOINTMENTS CRUD

    allAppoQuery:`
    SELECT a.appo_id,a.appoDate,a.appoTime,a.appoType,u.name,u.last_name,u.email,u.avatar,s.status
    FROM appointments a
    INNER JOIN users u ON a.user_id = u.user_id
    INNER JOIN appoState s ON a.status = s.status`,

    appoByUserIdQuery:`
    SELECT a.appo_id,a.appoDate,a.appoTime,a.appoType,u.name,u.last_name,u.email,u.avatar,s.status
    FROM appointments a
    INNER JOIN users u ON a.user_id = u.user_id
    INNER JOIN appoState s ON a.status = s.status
    WHERE u.user_id=$1`,

    createAppoQuery:`
    INSERT INTO appointments (appoDate, appoTime, appoType, user_id, status)
    VALUES ($1,$2,$3,$4,$5)`,

    updateAppoQuery:`
    UPDATE appointments
    SET appoDate=$1, appoTime=$2, appoType=$3
    WHERE appointments.appo_id=$4`,

    deleteAppoQuery:`
    DELETE FROM appointments
    WHERE appo_id=$1`,

//AppoState READ - UPDATE STATUS

    appoByStatusQuery:`
    SELECT a.appo_id,a.appoDate,a.appoTime,a.appoType,u.name,u.last_name,u.email,u.avatar,s.status
    FROM appointments a
    INNER JOIN users u ON a.user_id = u.user_id
    INNER JOIN appoState s ON a.status = s.status
    WHERE s.status=$1
    ORDER BY a.appoDate`,

    appoByStatusByUserQuery:`
    SELECT a.appo_id,a.appoDate,a.appoTime,a.appoType,u.name,u.last_name,u.email,u.avatar,s.status
    FROM appointments a
    INNER JOIN users u ON a.user_id = u.user_id
    INNER JOIN appoState s ON a.status = s.status
    WHERE s.status=$1 AND u.user_id=$2
    ORDER BY a.appoDate`,

    changeStatusQuery:`
    UPDATE appointments
    SET status=$1
    WHERE appo_id=$2`
}

module.exports = queries;