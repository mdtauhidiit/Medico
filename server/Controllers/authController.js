const User = require("../models/UserSchema");
const Doctor = require("../models/DoctorSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (user) => {
  
  return jwt.sign(
    {
      id: String(user._id),
      role: user.role,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "8h" }
  );
};

const register = async (req, res) => {
  const { name, email, password, role, gender, photo } = req.body;
  try {
    let user = null;
    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role == "doctor") {
      user = await Doctor.findOne({ email });
    }

    //check if user exists
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashedPassword,
        photo,
        gender,
      });
    }

    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashedPassword,
        photo,
        gender,
      });
    }

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "User successfully created!" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error, Try again!" });
  }
};

const login = async (req, res) => {
  const { email} = req.body;
  try {
    let user = null;
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }

    if (!user) {
      return res.status(404).json({ message: "User does not exists! " });
    }

    //compare password
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials!" });
    }

    //generate token
    const token = generateToken(user);

    const { password, role, appointments, ...rest } = user._doc;
    res
      .status(200)
      .json({
        status: true,
        message: "Logged in Successfully!",
        token,
        data: { ...rest },
        role,
      });
  } catch (error) {
    res.status(400).json({ status: false, message: "Log in Failed!" });
  }
};

module.exports = { register, login };
