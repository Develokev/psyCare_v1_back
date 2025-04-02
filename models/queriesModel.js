/**DOCS
 * Sentencias SQL para consumir de la BBDD
 * CRUD Users (patients-admin)
 * Se pueden leer usuarios, buscar usuario por id buscar usuario por email, actualizar y borrar por id.
 * Appointments (+change status)
 * Se pueden leer citas, buscar citas por id de citas, buscar citas por id de usuario, actualizar y borrar citas por id.
 */
const queries = {

//USERS CRUD

    /**
     * Sentencia que busca todos los pacientes en BBDD exceptuando los ADMIN.
     */
    allPatientsQuery:`
    SELECT u.user_id,u.name,u.last_name,u.email,u.avatar,u.register_date,roles.role
    FROM users AS u
    INNER JOIN roles ON u.role = roles.role
	WHERE roles.role = 'patient'`,

    /**
     * Sentencia que busca pacientes por email
     */
    patientByEmailQuery:`
    SELECT u.user_id,u.name,u.last_name,u.email,u.password,u.avatar,u.register_date,roles.role
    FROM users AS u
    INNER JOIN roles ON u.role = roles.role
	WHERE u.email=$1`,

    /**
     * Sentencia que busca pacientes por user_id
     */
    patientByIdQuery:`
    SELECT u.user_id,u.name,u.last_name,u.email,u.avatar,roles.role
    FROM users AS u
    INNER JOIN roles ON u.role = roles.role
	WHERE u.user_id=$1`,

    /**
     * Sentencia que crea (rol,nombre,apellido,correo,pass,avatar) pacientes y genera un user_id
     */
    createPatientQuery:`
    INSERT INTO users (role, name, last_name, email, password, avatar)
    VALUES ($1, $2, $3, $4, $5, $6)`,

    /**
     * Sentencia que actualiza (nombre,apellido,pass,avatar) info pacientes por user_id
     */
    updatePatientQuery:`
    UPDATE users
    SET name=$1, last_name=$2, password=$3, avatar=$4
    WHERE user_id=$5`,

    /**
     * Sentencia que borra paciente por user_id
     */
    deletePatientQuery:`
    DELETE FROM users
    WHERE user_id=$1`,

//APPOINTMENTS CRUD

    /**
     * Sentencia que busca todas las citas en la BBDD
     */
    allAppoQuery:`
    SELECT a.appo_id,a.appoDate,a.appoTime,a.appoType,u.name,u.last_name,u.email,u.avatar,s.status
    FROM appointments a
    INNER JOIN users u ON a.user_id = u.user_id
    INNER JOIN appoState s ON a.status = s.status`,

    /**
     * Sentencia que todas las citas en BBDD por user_id
     */
    appoByUserIdQuery:`
    SELECT a.appo_id,a.appoDate,a.appoTime,a.appoType,u.name,u.last_name,u.email,u.avatar,s.status
    FROM appointments a
    INNER JOIN users u ON a.user_id = u.user_id
    INNER JOIN appoState s ON a.status = s.status
    WHERE u.user_id=$1`,

    /**
     * Sentencia que crea cita(fecha,hora,tipo) bajo un user_id
     */
    createAppoQuery:`
    INSERT INTO appointments (appoDate, appoTime, appoType, user_id, status)
    VALUES ($1,$2,$3,$4,$5)`,

    /**
     * Sentencia que actualiza cita (fecha,hora,tipo) por appointment_id
     */
    updateAppoQuery:`
    UPDATE appointments
    SET appoDate=$1, appoTime=$2, appoType=$3
    WHERE appointments.appo_id=$4`,

    /**
     * Sentencia que borra cita por appointment_id
     */
    deleteAppoQuery:`
    DELETE FROM appointments
    WHERE appo_id=$1`,

//AppoState READ - UPDATE STATUS

    /**
     * Sentencia que busca todas las citas por status(pendiente,confirmada,pagada,cancelada).
     */
    appoByStatusQuery:`
    SELECT a.appo_id,a.appoDate,a.appoTime,a.appoType,u.name,u.last_name,u.email,u.avatar,s.status
    FROM appointments a
    INNER JOIN users u ON a.user_id = u.user_id
    INNER JOIN appoState s ON a.status = s.status
    WHERE s.status=$1
    ORDER BY a.appoDate`,

    /**
     * Sentencia que busca todas las citas por status(pendiente,confirmada,pagada,cancelada) por user_id.
     */
    appoByStatusByUserQuery:`
    SELECT a.appo_id,a.appoDate,a.appoTime,a.appoType,u.name,u.last_name,u.email,u.avatar,s.status
    FROM appointments a
    INNER JOIN users u ON a.user_id = u.user_id
    INNER JOIN appoState s ON a.status = s.status
    WHERE s.status=$1 AND u.user_id=$2
    ORDER BY a.appoDate`,

    /**
     * Sentencia que actualiza el estado de una cita(pendiente,confirmada,pagada,cancelada) por appointment_id.
     */
    changeStatusQuery:`
    UPDATE appointments
    SET status=$1
    WHERE appo_id=$2`
}

module.exports = queries;