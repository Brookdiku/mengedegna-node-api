//import
const db = require("../models")

//configuration
const BusImage = db.busImages;
const createBusImage = async (req, res) => {

    const busId = req.body.id;
    const images = req.files;
    console.log(busId);
    console.log(images);
    if (!images || !req.body.id || req.body.id === "") {
        // The request does not contain a file
        res.status(400).send({
            message: "Please specify the file key with the name <<image>> and the parent bus id key with <<id>> with out the quote.",
        });
    } else {
        const busImageArray = [];
        images.map(image => {
            busImageArray.push({
                imageUrl: image.filename,
                bus_id: busId
            })
        })
        const busImage = await BusImage.bulkCreate(busImageArray)
        // Return the success message
        res.status(200).send({
            message: "image added",
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