//import
const db = require("../models")
const path = require('path'); // Add the path module
//configuration
const BusImage = db.busImages;
const createBusImage = async (req, res) => {
    if (!req.files || !req.files.image || !req.body.busId || req.body.busId === "") {
        // The request does not contain a file
        res.status(400).send({
            message: "Please specify the file key with the name <<image>> and the parent bus id key with <<busId>> with out the quote.",
        });
    } else {
        const file = req.files.image;
        const fileName = file.name;
        const busId = req.body.busId;
        // Create a unique file name for the image
        const uniqueFileName = `${Date.now()}_${fileName}`;
        // Save the file to the specified directory
        const destinationPath = path.join(__dirname, '..', 'images', uniqueFileName);
        await file.mv(destinationPath);
        // Save the file name to the database
        const busImage = await BusImage.create({
            imageUrl: uniqueFileName,
            bus_id: busId
        });
        // Return the success message
        res.status(200).send({
            message: "image added",
            data: {
                id: busImage.id,
                imageUrl: busImage.imageUrl,
            }
        });
    }
}
//get all busImages
const getBusImages = async (req, res) => {
    let busImages = await BusImage.findAll({
        attributes: [
            'id',
            'imageUrl',
        ]
    });
    res.status(200).send(busImages);
}
//get busImages
const getBusImage = async (req, res) => {
    let id = req.params.id;
    const image = await BusImage.findOne({ where: { id } });
    if (!image) {
        return res.status(404).send({
            message: "Image not found."
        });
    }
    const busImage = await BusImage.findOne({
        attributes: [
            'id',
            'imageUrl',
        ], where: { id: id }
    });
    res.status(200).send(busImage);
}
//delete bus
const deleteBusImage = async (req, res) => {
    // Check if the bus exists
    let id = req.params.id;
    const image = await BusImage.findOne({ where: { id } });
    if (!image) {
        return res.status(404).send({
            message: "Image not found."
        });
    }
    await BusImage.destroy({ where: { id: id } });
    res.status(200).send({ message: "Image deleted." });
}
module.exports = {
    createBusImage,
    getBusImages,
    getBusImage,
    deleteBusImage
}