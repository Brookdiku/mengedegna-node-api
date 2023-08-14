//import
const db = require("../models")
const bcrypt = require("bcrypt")
//configuration
const User = db.user;
//create user
const createUser = async (req, res) => {
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
//get all user
const getUsers = async (req, res) => {
    let users = await User.findAll({
        attributes: [
            'id',
            'firstName',
            'lastName',
            'email',
            'phoneNumber',
            "photo"
        ]
    });
    res.status(200).send(users);
}
//get one user
const getUser = async (req, res) => {
    let id = req.params.id;
    let user = await User.findOne({
        attributes: [
            'id',
            'firstName',
            'lastName',
            'email',
            'phoneNumber',
            "photo"
        ],
        where: { id: id }
    });
    res.status(200).send(user);
}
// update user
const updateUser = async (req, res) => {
    let id = req.params.id;
    const user = await User.update(req.body, { where: { id: id } })
    res.status(200).send({
        message: "user updated.",
        user: user
    });
}
//delete user
const deleteUser = async (req, res) => {
    let id = req.params.id;
    await User.destroy({ where: { id: id } });
    res.status(200).send({ message: "user deleted." });
}
module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}