const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://127.0.0.1:3000',  //address frontend
    credentials: true,               //izinkan cookie
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'e99c3e847ab547b3a6782f3', 
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, 
        sameSite: 'None',
        maxAge: 3600000, //1 jam
    }
}));
//routes
app.use('/api/users', userRoutes);

//jalanin server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
