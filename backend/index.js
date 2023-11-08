import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";
import stripeRoute from "./routes/stripe.js";
import webhookRoute from './routes/webhook.js' ;
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const endpointSecret = "whsec_e73f75173a37acc7b4dc87974e716a457d4faa76e1c8966d2abb513904e245e1";


const corsOptions = {
  origin: true,
  credentials: true,
};

//app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static("public"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

dotenv.config();
//database connection
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB database connected");
  } catch (err) {
    console.log("MongoDB database connection failed");
  }
};

app.use("/api/auth", authRoute);
app.use("/api/tours", tourRoute);
app.use("/api/user", userRoute);
app.use("/api/review", reviewRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/stripe", stripeRoute);
app.use("/", webhookRoute);

//for testing
app.get("/", (req, res) => {
  res.send("api is working");
});
const port = process.env.PORT || 8000;

app.listen(port, () => {
  connect();
  console.log("server listening on port", port);
});
