import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter your name!"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [4, "Password should be greater than 4 characters"],
    },
    photo: {
        type: [],
    },
    role: {
        type: String,
        default: "user",
        
    },
    bookings:[
        { type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    }
    ]
},
    { timestamps : true}
)

export default mongoose.model("User", userSchema);