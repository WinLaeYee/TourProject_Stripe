import Booking from "../models/Booking.js";
import User from "../models/User.js";
import { sendMail } from "../utils/sendMail.js";

//create new booking
export const createBooking = async (req, res) => {
  //const newBooking = new Booking(req.body);
  //console.log("reqbody", req.body);
  const newBooking = await Booking.create({
    userId: req.body.userId,
    userEmail: req.body.userEmail,
    tourName: req.body.tourName,
    fullName: req.body.fullName,
    city: req.body.city,
    guestSize: req.body.guestSize,
    phone: req.body.phone,
    totalAmount: req.body.totalAmount,
    bookAt: req.body.bookAt,
  });

  const data = await User.findOneAndUpdate(
    { _id: req.body.userId },
    { $push: { bookings: newBooking._id } },
    { new: true }
  ).populate("bookings");

  console.log("data is ***", data);

  try {
    //const savedBooking = await newBooking.save();
    const emailOptions = {
      email: req.body.userEmail,
      subject: "Booking Received",
      message:
        "Thank you for booking! Your booking has been received and is pending approval by admin!",
    };

    await sendMail(emailOptions);

    res.status(200).json({
      success: true,
      message: "Your tour is booked, and a confirmation email has been sent.",
      data: newBooking,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

//get single booking
export const getBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Booking.findById(id);

    res.status(200).json({ success: true, message: "Successful", data: book });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

//get all booking
export const getAllBooking = async (req, res) => {
  try {
    const books = await Booking.find();

    res.status(200).json({ success: true, message: "Successful", data: books });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getBookingsByTourName = async (req, res) => {
  const tourName = req.params.tourName;

  try {
    const bookings = await Booking.find({ tourName });
    res
      .status(200)
      .json({ success: true, message: "Successful", data: bookings });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

export const getBookingsByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userBookings = await Booking.find({ userId })
      .populate({
        path: "tourId",
        select: "city title",
      })
      .exec();

    res
      .status(200)
      .json({ success: true, message: "Successful", data: userBookings });
  } catch (err) {
    console.log("Error fetching user bookings:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res.json({ success: true, message: "Booking canceled successfully" });
  } catch (error) {
    console.log("Error canceling booking:", error);
    res
      .status(500)
      .json({ success: false, message: "Unable to cancel booking" });
  }
};

export const approveBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "approved" },
      { new: true }
    );

    if (!updatedBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    // Send an approval confirmation email to the user
    const emailOptions = {
      email: updatedBooking.userEmail,
      subject: "Booking Approval Confirmation",
      message:
        "Successful Booking!Your booking has been approved and you can click here to make your payment - http://localhost:3000/my-bookings",
    };

    await sendMail(emailOptions);

    res.json({
      success: true,
      message: "Booking approved successfully",
      data: updatedBooking,
    });
  } catch (error) {
    console.log("Error approving booking:", error);
    res
      .status(500)
      .json({ success: false, message: "Unable to approve booking" });
  }
};

export const rejectBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "rejected" },
      { new: true }
    );

    if (!updatedBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    // Send a rejection confirmation email to the user
    const emailOptions = {
      email: updatedBooking.userEmail,
      subject: "Booking Rejection Notification",
      message: "Unfortunately, your booking has been rejected.",
    };

    await sendMail(emailOptions);

    res.json({
      success: true,
      message: "Booking rejected successfully",
      data: updatedBooking,
    });
  } catch (error) {
    console.log("Error rejecting booking:", error);
    res
      .status(500)
      .json({ success: false, message: "Unable to reject booking" });
  }
};
