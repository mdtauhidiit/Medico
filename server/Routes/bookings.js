const express = require('express')
const { authenticate } = require('../auth/verifyToken')
const {createPaymentOrder,verifyPayment} = require('../Controllers/bookingController')

const router = express.Router()

router.post('/checkout-session/:doctorId',authenticate,createPaymentOrder)
router.post('verify-payment',authenticate,verifyPayment)

module.exports= router