//import
const db = require("../models")
//configuration
const Bus = db.buses;
//create bus
const createBus = async (req, res) => {
    const data = { plateNumber, totalSeats, grade } = req.body;
    const bus = await Bus.create(data)
    res.status(200).send({
        message: "bus record created.",
        bus: {
            id: bus.id,
            grade: bus.grade,
            plateNumber: bus.plateNumber,
            totalSeats: bus.totalSeats
        }
    });
}
//get all bus
const getBuses = async (req, res) => {
    let buses = await Bus.findAll({
        attributes: [
            'id',
            'grade',
            'plateNumber',
            'totalSeats',
        ]
    });
    res.status(200).send(buses);
}
//get one bus
const getBus = async (req, res) => {
    let id = req.params.id;
    let bus = await Bus.findOne({
        attributes: [
            'id',
            'grade',
            'plateNumber',
            'totalSeats',
        ], where: { id: id }
    });
    res.status(200).send(bus);
}
// update bus
const updateBus = async (req, res) => {
    let id = req.params.id;
    const bus = await Bus.update(req.body, { where: { id: id } })
    res.status(200).send({
        message: "bus record updated.",
        bus: {
            id: bus.id,
            grade: bus.grade,
            plateNumber: bus.plateNumber,
            totalSeats: bus.totalSeats
        }
    });
}
//delete bus
const deleteBus = async (req, res) => {
    let id = req.params.id;
    await Bus.destroy({ where: { id: id } });
    res.status(200).send({ message: "bus record deleted." });
}
module.exports = {
    createBus,
    getBuses,
    getBus,
    updateBus,
    deleteBus
}