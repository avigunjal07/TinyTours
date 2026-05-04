import Tour from "../models/Tour.js";
import dotenv from "dotenv";
dotenv.config();


// ===================== GET TOURS =====================
const getTours = async (req, res) => {
  try {
    const tours = await Tour.find({ user: req.user.id }).populate(
      "user",
      "-password"
    );

    return res.json({
      success: true,
      message: "Fetched tours successfully",
      data: tours,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};


// ===================== CREATE TOUR =====================
const postTours = async (req, res) => {
  try {
    const {
      title,
      description,
      cities,
      startDate,
      endDate,
      photos = []
    } = req.body;

    const newTour = new Tour({
      title,
      description,
      cities,
      startDate,
      endDate,
      photos: photos || [],
      user: req.user.id,
    });

    const savedTour = await newTour.save();

    return res.json({
      success: true,
      message: "Tour created successfully",
      data: savedTour,
    });

  } catch (error) {
    return res.json({
      success: false,
      message: `Tour creation failed: ${error.message}`,
      data: null,
    });
  }
};


// ===================== UPDATE TOUR =====================
const putTours = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const tour = await Tour.findById(id);

    if (!tour) {
      return res.json({
        success: false,
        message: "Tour not found",
        data: null,
      });
    }

    if (tour.user.toString() !== userId) {
      return res.json({
        success: false,
        message: "Unauthorized to update this tour",
        data: null,
      });
    }

    const {
      title,
      description,
      cities,
      startDate,
      endDate,
      photos
    } = req.body;

    // 🔥 IMPORTANT FIX: do not overwrite photos if empty
    const updateData = {
      title,
      description,
      cities,
      startDate,
      endDate,
    };

    if (photos && photos.length > 0) {
      updateData.photos = photos;
    }

    await Tour.updateOne({ _id: id }, updateData);

    const updatedTour = await Tour.findById(id);

    return res.json({
      success: true,
      message: "Tour updated successfully",
      data: updatedTour,
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};


export { getTours, postTours, putTours };