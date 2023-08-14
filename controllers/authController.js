const db = require("../models")
const bcrypt = require("bcrypt")
//configuration
const User = db.user;
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
        return res.status(200).send({
            message: "successfully logged in.",
            data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                email: user.email,
                photo: user.photo
            }
        });
    } else {
        return res.status(404).send({
            message: "password in correct."
        });
    }
};
module.exports = { register, login };