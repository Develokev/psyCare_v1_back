const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv').config();

const port = process.env.Port || 3000;

// Parse - translating json
app.use(express.json());
// To parse req with urlenconded payload
app.use(express.urlencoded({ extended: false }));

//Routes - prefix to make requests from back to BBDD.
app.use('/admin/users', require('./routers/userRouters'))
app.use('/admin/appo', require('./routers/appoRouters'))
app.use('/auth/', require('./routers/authRouters'))

app.use((req, res, next) => {
    res.status(404).send("404", {
        title: 'error 404',
        text: 'Sorry, page not found'
    })
});

// Listener port
app.listen(port, () => {
    console.log(`Backend conected from port ${port} successfully.`)
});