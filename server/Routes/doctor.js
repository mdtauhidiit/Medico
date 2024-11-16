const {
  deleteDoctor,
  updateDoctor,
  getSingleDoctor,
  getAllDoctors,
  getDoctorProfile,
} = require("../Controllers/doctorController");
const { authenticate, restrict } = require("../auth/verifyToken");
const express = require("express");

const reviewRouter = require("./review");

const router = express.Router();

//nested route
router.use('/:doctorId/reviews',reviewRouter)

router.get("/", getAllDoctors);
router.get("/:id", getSingleDoctor);
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);
router.get('/profile/me',authenticate,restrict(["doctor"]),getDoctorProfile)

module.exports = router;
