const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const authRoute = require('./Routes/auth')
const userRoute = require('./Routes/user')
const doctorRoute = require('./Routes/doctor')
const reviewRoute = require('./Routes/review')
const bookingRoute = require('./Routes/bookings')

dotenv.config();

const app = express();
const port = process.env.PORT||8000

const corsOptions = {
  origin: true,
};

//database connection
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("Database Connection failed", error);
  }
};

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/users',userRoute)
app.use('/api/v1/doctors',doctorRoute)
app.use('/api/v1/reviews',reviewRoute)
app.use('/api/v1/bookings',bookingRoute)

app.get("/", (req, res) => {
  res.send({ message: "Hello from server" });
});

app.listen(port, () => {
  connectDB();
  console.log(`Server listening at port : ${port}`);
});
