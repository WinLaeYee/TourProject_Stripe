
import { sendEmailTemplate } from "../utils/sendMail.js";
import ejs from "ejs";
import Booking from "../models/Booking.js";
import { __dirname } from "../utils/path.js";
import path from "path";

export const createTemplate = async (bookingId) => {
  console.log("bookingId", bookingId);
  const findInfo = await Booking.findOne({
    _id: bookingId,
    stripe_payment: true,
  });
  console.log("findInfo", findInfo);
  if (!findInfo) return res.status(404).json({ message: "Not Found" });
  const email = findInfo.userEmail;

  const taxRate = 0.1;
  const tax = findInfo.totalAmount * taxRate;
  const totalAmount = findInfo.totalAmount + tax;

  const tourInfo = {
    pageTitle: "Travel Booking Invoice",
    name: findInfo.fullName,
    tourName: findInfo.tourName,
    email: findInfo.userEmail,
    address: findInfo.address,
    person: findInfo.guestSize,
    mobile: findInfo.phone,
    city: findInfo.city,
    price: findInfo.price,
    total: findInfo.totalAmount,
    paid_Date: findInfo.paidAt,
    tax: tax,
    totalAmount: totalAmount
  };
  const templatePath = path.join(__dirname, "../views/template.ejs");
  ejs.renderFile(
    templatePath,
    { info: tourInfo },
    async (err, renderedTemplate) => {
      try {
        if (err) {
          console.log("Error rendering template:", err);
          return res.status(500).json({ message: "Internal Server Error" });
        } else {
          await sendEmailTemplate(email, renderedTemplate);
        }
      } catch (error) {
        console.log("Error sending email:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  );
};
