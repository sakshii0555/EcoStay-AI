const Homestay = require("../models/Homestay");

// ============================================================
// GET ALL HOMESTAYS - PUBLIC
// ============================================================

const getAllHomestays = async (req, res, next) => {
  try {
    const homestays = await Homestay.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Homestays fetched successfully",
      data: homestays,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// GET HOMESTAYS BY DISTRICT - PUBLIC
// ============================================================

const getHomestaysByDistrict = async (req, res, next) => {
  try {
    const district = req.params.district
      .toLowerCase()
      .trim();

    const homestays = await Homestay.find({
      district: district,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "District homestays fetched successfully",
      data: homestays,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// GET SINGLE HOMESTAY - PUBLIC
// ============================================================

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


// ============================================================
// CREATE HOMESTAY - ADMIN ONLY
// ============================================================

const createHomestay = async (req, res, next) => {
  try {
    const {
      name,
      location,
      district,
      image,
      price,
      rating,
      description,
    } = req.body;

    // Check required fields
    if (
      !name ||
      !location ||
      !district ||
      !image ||
      price === undefined ||
      rating === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required homestay details.",
      });
    }

    const homestay = await Homestay.create({
      name,
      location,
      district: district.toLowerCase().trim(),
      image,
      price,
      rating,
      description: description || "",
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


// ============================================================
// UPDATE HOMESTAY - ADMIN ONLY
// ============================================================

const updateHomestay = async (req, res, next) => {
  try {
    const updateData = {
      ...req.body,
    };

    // Normalize district if it is being updated
    if (updateData.district) {
      updateData.district = updateData.district
        .toLowerCase()
        .trim();
    }

    const homestay = await Homestay.findByIdAndUpdate(
      req.params.id,
      updateData,
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


// ============================================================
// DELETE HOMESTAY - ADMIN ONLY
// ============================================================

const deleteHomestay = async (req, res, next) => {
  try {
    const homestay = await Homestay.findByIdAndDelete(
      req.params.id
    );

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


// ============================================================
// SEARCH HOMESTAYS BY LOCATION - PUBLIC
// ============================================================

const searchHomestays = async (req, res, next) => {
  try {
    const { location } = req.query;

    const homestays = await Homestay.find({
      location: {
        $regex: location || "",
        $options: "i",
      },
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: homestays,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// EXPORTS
// ============================================================

module.exports = {
  getAllHomestays,
  getHomestaysByDistrict,
  getHomestayById,
  createHomestay,
  updateHomestay,
  deleteHomestay,
  searchHomestays,
};