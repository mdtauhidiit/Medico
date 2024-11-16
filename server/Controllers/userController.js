const User = require("../models/UserSchema");
const Booking = require("../models/BookingSchema");
const Doctor = require("../models/DoctorSchema");

const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).select("-password");
    return res.status(200).json({
      success: true,
      message: "Successfully updated!",
      data: updatedUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to update" });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Successfully deleted!",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete" });
  }
};

const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");
    return res.status(200).json({
      success: true,
      message: "User found!",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({ success: false, message: "User not found!" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    return res.status(200).json({
      success: true,
      message: "Users found!",
      data: users,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Users not found!" });
  }
};

const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    const { password, ...rest } = user._doc;
    return res.status(200).json({
      success: true,
      message: "Profile info is getting!",
      data: { ...rest },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, cannot get profile!",
    });
  }
};

const getMyAppointments = async (req, res) => {
  try {
    //step-1 : retrieve appointments from booking
    const bookings = await Booking.find({ user: req.userId }).populate('doctor','name email ticketPrice averageRating phone photo specialization createdAt' )
    return res.status(200).json({
      success: true,
      message: "Appointments are getting",
      data: bookings,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong , cannot get!" });
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUser,
  getUserProfile,
  getMyAppointments,
};
