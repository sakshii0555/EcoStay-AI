const Homestay = require("../models/Homestay");

// GET All Homestays - PUBLIC
const getAllHomestays = async (req, res, next) => {
  try {
    const homestays = await Homestay.find();

    res.status(200).json({
      success: true,
      message: "Homestays fetched successfully",
      data: homestays,
    });
  } catch (error) {
    next(error);
  }
};

// GET Single Homestay
const getHomestayById = async (req, res, next) => {
  try {
    const homestay = await Homestay.findById(req.params.id);

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
  } catch (error) {
    next(error);
  }
};

// CREATE Homestay
const createHomestay = async (req, res, next) => {
  try {
    const homestay = await Homestay.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Homestay created successfully",
      data: homestay,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE Homestay
const updateHomestay = async (req, res, next) => {
  try {
    const homestay = await Homestay.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!homestay) {
      return res.status(404).json({
        success: false,
        message: "Homestay not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Homestay updated successfully",
      data: homestay,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE Homestay
const deleteHomestay = async (req, res, next) => {
  try {
    const homestay = await Homestay.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!homestay) {
      return res.status(404).json({
        success: false,
        message: "Homestay not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Homestay deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// SEARCH by Location
const searchHomestays = async (req, res, next) => {
  try {
    const { location } = req.query;

    const homestays = await Homestay.find({
      location: {
        $regex: location,
        $options: "i",
      },
    });

    res.status(200).json({
      success: true,
      data: homestays,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllHomestays,
  getHomestayById,
  createHomestay,
  updateHomestay,
  deleteHomestay,
  searchHomestays,
};