const homestays = require("../data/homestays.json");

// =======================
// GET All Homestays
// =======================
const getAllHomestays = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Homestays fetched successfully",
    data: homestays,
  });
};

// =======================
// GET Single Homestay
// =======================
const getHomestayById = (req, res) => {
  const id = parseInt(req.params.id);

  const homestay = homestays.find((item) => item.id === id);

  if (!homestay) {
    return res.status(404).json({
      success: false,
      message: "Homestay not found",
    });
  }

  res.status(200).json({
    success: true,
    data: homestay,
  });
};

// =======================
// POST Create Homestay
// =======================
const createHomestay = (req, res) => {
  const { name, location, price, rating } = req.body;

  const newHomestay = {
    id: homestays.length + 1,
    name,
    location,
    price,
    rating,
  };

  homestays.push(newHomestay);

  res.status(201).json({
    success: true,
    message: "Homestay created successfully",
    data: newHomestay,
  });
};

// =======================
// PUT Update Homestay
// =======================
const updateHomestay = (req, res) => {
  const id = parseInt(req.params.id);

  const homestay = homestays.find((item) => item.id === id);

  if (!homestay) {
    return res.status(404).json({
      success: false,
      message: "Homestay not found",
    });
  }

  const { name, location, price, rating } = req.body;

  if (name) homestay.name = name;
  if (location) homestay.location = location;
  if (price) homestay.price = price;
  if (rating) homestay.rating = rating;

  res.status(200).json({
    success: true,
    message: "Homestay updated successfully",
    data: homestay,
  });
};

// =======================
// DELETE Homestay
// =======================
const deleteHomestay = (req, res) => {
  const id = parseInt(req.params.id);

  const index = homestays.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Homestay not found",
    });
  }

  homestays.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Homestay deleted successfully",
  });
};

// =======================
// SEARCH Homestays
// =======================
const searchHomestays = (req, res) => {
  const location = req.query.location;

  const result = homestays.filter(
    (item) =>
      item.location.toLowerCase() === location.toLowerCase()
  );

  res.status(200).json({
    success: true,
    data: result,
  });
};

module.exports = {
  getAllHomestays,
  getHomestayById,
  createHomestay,
  updateHomestay,
  deleteHomestay,
  searchHomestays,
};