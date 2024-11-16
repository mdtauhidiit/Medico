const jwt = require("jsonwebtoken");
const Doctor = require("../models/DoctorSchema");
const User = require("../models/UserSchema");

const authenticate = async (req, res, next) => {
  //get token from headers
  const authToken = req.headers["authorization"];
 // console.log(authToken,"token")

  //check if token exists
  if (!authToken || !authToken.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ success: false, message: "No token, Authorization denied!" });
  }

  try {
    const token = authToken.split(" ")[1];

    //verify token
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decode.id;
    req.role = decode.role;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Token is Expired!" });
    }
    return res.status(401).json({ success: false, message: "Invalid token!" });
  }
};

const restrict = (roles) => async (req, res, next) => {
  //from authenticate middleware get userId
  const userId = req.userId;
  let user;

  const patient = await User.findById(userId);
  const doctor = await Doctor.findById(userId);

  if (patient) {
    user = patient;
  }
  if (doctor) {
    user = doctor;
  }
  if (!roles.includes(user.role)) {
    return res
      .status(401)
      .json({ success: false, message: "You are not authorized!" });
  }
  next();
};
module.exports = { authenticate, restrict };
