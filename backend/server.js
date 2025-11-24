const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const cors = require('cors')

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

//body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors())

//Cookie parser
app.use(cookieParser());

//Mount routers
app.use("/api/v1/camps", camps);
app.use("/api/v1/auth", auth);
app.use("/api/v1/bookings", bookings);
app.use("/api/v1/camps/:campId/amenities", amenities);
app.use('/api/v1/amenitybookings', amenityBookings);
app.use('/api/v1/campreviews', campReviews);
app.use('/api/v1/reviews', userReviews);
app.use('/api/v1/bookingreviews', bookingReviews);
//by kwan
app.use('/api/v1/reports',reports);