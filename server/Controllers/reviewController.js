const Review = require("../models/ReviewSchema");
const Doctor = require("../models/DoctorSchema");

//Get all reviews

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    return res
      .status(200)
      .json({ success: true, message: "Successful", data: reviews });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Not Found!" });
  }
};

const createReview = async (req, res) => {
  if (!req.body.doctor) {
    req.body.doctor = req.params.doctorId;
  }
  if (!req.body.user) {
    req.body.user = req.userId;
  }

  const newReview = new Review(req.body);
  try {
    const savedReview = await newReview.save();
    await Doctor.findByIdAndUpdate(req.body.doctor,{
        $push:{reviews:savedReview._id}
    })
    return res.status(200).json({ success: true, message: "Review Submitted!",data:savedReview });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {getAllReviews,createReview};
