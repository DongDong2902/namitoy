const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const users = [];

const upsert = (array, item) => {
    const i = array.findIndex(_item => _item.email === item.email);
    if (i > -1) array[i] = item;
    else array.push(item);
}

const getCurrentUser = (req, res) => {
    if (req.session.JWT) {
        return res.status(200).json(req.session.JWT)
    }

    return res.status(200).json()
}

const login = async (req, res) => {
    const {token} = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    })
    const payload = ticket.getPayload();

    const userData = {
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
    }
    upsert(users, userData)
    req.session.JWT = userData

    res.status(200).json(userData).end();
}

const logout = (req, res) => {
    req.session.destroy(function (err) {
        return res.status(200).json().end()
    })

    return res.status(200).json().end()
}

module.exports = {
    index: getCurrentUser,
    login: login,
    logout: logout
};