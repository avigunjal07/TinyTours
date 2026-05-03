import Tour from "../models/Tour.js";
import dotenv from "dotenv";
dotenv.config();

const getTours = async (req, res) => {
    const tours = await Tour.find({ user: req.user.id }).populate(
        "user",
        "-password"
    );

    return res.json({
        success: true,
        message: "Fetched tours successfully",
        data: tours,
    });
};

const postTours = async (req, res) => {
    const { title, description, cities, startDate, endDate, photos } =
        req.body;

    const newTour = new Tour({
        title,
        description,
        cities,
        startDate,
        endDate,
        photos,
        user: req.user.id,
    });

    try {
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

const putTours = async (req, res) => {
    const user = req.user;
    const userId = user.id;
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

    const { title, description, cities, startDate, endDate, photos } =
        req.body;

    await Tour.updateone(
        { _id: id },
        { title, description, cities, startDate, endDate, photos }
    );

    const updatedTour = await Tour.findById(id);

    return res.json({
        success: true,
        message: "Tour update authorized",
        data: updatedTour,
    });
};

export { getTours, postTours, putTours };