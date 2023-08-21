const db = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
//configuration
const User = db.users;
let refreshTokenArray = []
//register
const register = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password, photo } = req.body;
    if (!firstName || !lastName || !phoneNumber || !password || !photo) {
        return res.status(400).send({
            message: "fill the required attributes."
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const data = {
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        email: email,
        phoneNumber: phoneNumber,
        password: hashedPassword,
        photo: photo
    }
    const user = await User.create(data)
    res.status(200).send({
        message: "user created.",
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            photo: user.photo
        }
    });
}
//login
const login = async (req, res) => {
    const data = { phoneNumber, password } = req.body;
    const user = await User.findOne({ where: { phoneNumber: phoneNumber } });
    if (!user) return res.status(404).send({ message: "record not found." });
    const auth = await bcrypt.compare(data.password, user.password);
    if (auth) {
        const loggedInUser = {
            id: user.id,
            name: user.firstName
        }
        const accessToken = generateAccessToken(loggedInUser)
        const refreshToken = jwt.sign(loggedInUser, process.env.REFRESH_TOKEN_SECRET)
        refreshTokenArray.push(refreshToken)
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        return res.status(200).send({
            message: "successfully logged in.",
            data: {
                id: user.id,
            },
            accessToken,
        })
    } else {
        return res.status(404).send({
            message: "password in correct."
        })
    }
};

function generateAccessToken(loggedUser) {
    return jwt.sign(loggedUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
}
const token = (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401);
    if (!refreshTokenArray.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, loggedInUser) => {
        const user = {
            id: loggedInUser.id,
            name: loggedInUser.firstName
        }
        if (err) return res.sendStatus(403);
        const newAccessToken = generateAccessToken(user)
        return res.status(200).send({
            message: "token refreshed.",
            data: {
                id: loggedInUser.id,
            },
            newAccessToken,
        })
    })
}
module.exports = { register, login, token };