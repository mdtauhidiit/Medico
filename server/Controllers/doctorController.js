const Booking = require("../models/BookingSchema");
const Doctor = require("../models/DoctorSchema");
const User = require('../models/UserSchema')

const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).select("-password");
    return res.status(200).json({
      success: true,
      message: "Successfully updated!",
      data: updatedDoctor,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to update" });
  }
};

const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    await Doctor.findByIdAndDelete(id);
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

const getSingleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id)
    .populate("reviews")
      .select("-password");
   
    return res.status(200).json({
      success: true,
      message: "Doctor found!",
      data: doctor,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Doctor not found!",err:error.message });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;
    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }
    return res.status(200).json({
      success: true,
      message: "Doctors found!",
      data: doctors,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Doctors not found!" });
  }
};

const getDoctorProfile = async(req,res)=>{
  const doctorId = req.userId;
  
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found!" });
    }
    const { password, ...rest } = doctor._doc;
    const bookings =  await Booking.find({doctor:doctorId}).populate('user','name email photo')
    const appointments=bookings
    return res.status(200).json({ success: true, message: "Profile info is getting! ",data:{...rest,appointments} });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong, cannot get!" });
  }
}

module.exports = { updateDoctor, deleteDoctor, getSingleDoctor, getAllDoctors,getDoctorProfile };
