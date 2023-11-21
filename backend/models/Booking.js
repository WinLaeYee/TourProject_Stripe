import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
    },
    city: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    address: {
      type: Object,
      default: null,
    },
    tourName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    guestSize: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
    },
    stripe_payment: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    bookAt: {
      type: Date,
      required: true,
    },
    paidAt:{
      type: Date,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
