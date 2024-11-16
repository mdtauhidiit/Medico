const User = require("../models/UserSchema");
const Doctor = require("../models/DoctorSchema");
const Booking = require("../models/BookingSchema");
const crypto = require("crypto");
const Razorpay = require("razorpay");
// const Stripe = require("stripe");

const createPaymentOrder = async (req, res) => {
  try {
    //get currently booking doctor
    const doctor = await Doctor.findById(req.params.doctorId);
    const user = await User.findById(req.userId);

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    const  amount  = req.body.ticketPrice;
    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }
    
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    console.log(order)
    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      ticketPrice: doctor.ticketPrice,
      session: order.id,
      amount: order.amount,
    });
    console.log("booking",booking)

    await booking.save();

    console.log(user)

    return res
      .status(200)
      .json({ success: true, message: "Initiating payment... ", order,orderId: order.id,customerName:user.name,customerEmail:user.email,customerPhone:user.phone });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error creating checkout session! " });
  }
};

const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
};

module.exports = { createPaymentOrder, verifyPayment };

// const getCheckoutSession = async (req, res) => {
//   try {
//     //get currently booking doctor
//     const doctor = await Doctor.findById(req.params.doctorId);
//     const user = await User.findById(req.userId);

//     //create stripe checkout session
//     // const stripe = new Stripe(process.env.STRIPE_SECTRET_KEY)
//     // const session = await stripe.checkout.sessions.create({

//     //   payment_method_types: ["card"],
//     //   mode: "payment",
//     //   success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
//     //   cancel_url: `${req.protocol}://${req.get("host")}/doctors/${doctor.id}`,
//     //   customer_email: user.email,
//     //   client_reference_id: req.params.doctorId,
//     //   line_items: [
//     //     {
//     //       price_data: {
//     //         currency: "usd",
//     //         unit_amount: doctor.ticketPrice * 100,
//     //         product_data: {
//     //           name: doctor.name,
//     //           description: doctor.bio,
//     //           images: [doctor.photo],
//     //         },
//     //       },
//     //       quantity:1
//     //     },
//     //   ],
//     // });

//     const booking = new Booking({
//       doctor: doctor._id,
//       user: user._id,
//       ticketPrice: doctor.ticketPrice,
//       session: response.id,
//       amount: response.amount,
//     });

//     await booking.save();
//     return res
//       .status(200)
//       .json({ success: true, message: "Successfully paid!", session });
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ success: false, message: "Error creating checkout session! " });
//   }
// };
