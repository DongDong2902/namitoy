const path = require('path');
const express = require('express');
const app = express();
const session = require('express-session');
app.use(
    session({
        secret: 'my-secret',
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000,
            // secure: true,
        }
    })
);

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const userRoute = require('./src/server/auth/auth')
app.use('/api/user', userRoute);

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});