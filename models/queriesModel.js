const queries = {

//USERS

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
    WHERE user_id=$1`
}

module.exports = queries;