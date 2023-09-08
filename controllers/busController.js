// Import the database models
const db = require("../models");

// Configure the bus model
const Bus = db.buses;

// Create a bus
const createBus = async (req, res) => {
  // Get the data from the request body
  let data = { plateNumber, totalSeats, grade } = req.body;

  // Validate the data
  if (!plateNumber || plateNumber === "" || !totalSeats || totalSeats === "" || !grade || grade == "") {
    return res.status(400).send({
      message: "Please fill in all required fields."
    });
  }

  // Check if the bus already exists
  const checkBus = await Bus.findOne({ where: { plateNumber: data.plateNumber } });
  if (checkBus) {
    return res.status(409).json({ message: "This bus already exists." });
  }

  // Create the bus
  const resBus = await Bus.create({
    plateNumber: data.plateNumber,
    totalSeats: data.totalSeats,
    grade: data.grade
  });
  const bus = {
    id: resBus.id,
    plateNumber: resBus.plateNumber,
    totalSeats: resBus.totalSeats,
    grade: resBus.grade
  }
  // Send the response
  res.status(200).json({ message: "bus created successfully.", bus });
};

// Get all buses
const getBuses = async (req, res) => {
  // Get all buses from the database
  const buses = await Bus.findAll({
    attributes: ["id", "grade", "plateNumber", "totalSeats"],
    include: [{
      model: db.busImages,
      as: "busImage",
      attributes: ["id", "imageUrl"]
    }]
  });

  // Send the response
  res.status(200).send(buses);
};

// Get one bus
const getBus = async (req, res) => {
  // Get the bus ID from the request params
  const id = req.params.id;

  // Get the bus from the database
  const bus = await Bus.findOne({
    where: { id },
    attributes: ["id", "grade", "plateNumber", "totalSeats"],
    include: [{
      model: db.busImages,
      as: "busImage",
      attributes: ["id", "imageUrl"]
    }]
  });

  // Check if the bus exists
  if (!bus) {
    return res.status(404).send({
      message: "Bus not found."
    });
  }

  // Send the response
  res.status(200).send(bus);
};

// Update a bus
const updateBus = async (req, res) => {
  // Get the bus ID from the request params
  const id = req.params.id;

  // Get the bus from the database
  const bus = await Bus.findOne({ where: { id } });

  // Check if the bus exists
  if (!bus) {
    return res.status(404).send({
      message: "Bus not found."
    });
  }

  // Update the bus data
  bus.update(req.body);

  // Save the bus
  await bus.save();

  // Send the response
  res.status(200).send({
    message: "Bus updated successfully.",
    bus: {
      id: bus.id,
      grade: bus.grade,
      plateNumber: bus.plateNumber,
      totalSeats: bus.totalSeats
    }
  });
};

// Delete a bus
const deleteBus = async (req, res) => {
  // Get the bus ID from the request params
  const id = req.params.id;

  // Get the bus from the database
  const bus = await Bus.findOne({ where: { id } });

  // Check if the bus exists
  if (!bus) {
    return res.status(404).send({
      message: "Bus not found."
    });
  }

  // Delete the bus
  await bus.destroy();

  // Send the response
  res.status(200).send({ message: "Bus deleted successfully." });
};

// Export the functions
module.exports = {
  createBus,
  getBuses,
  getBus,
  updateBus,
  deleteBus
}