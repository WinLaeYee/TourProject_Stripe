import Booking from "../models/Booking.js";
import User from "../models/User.js";

//create User
export const createUser = async (req, res) => {
  const { username, email, password, photo, role } = req.body;

  const newUser = new User({
    username,
    email,
    password,
    photo,
    role,
  });

  try {
    const savedUser = await newUser.save();
    return res.status(201).json({
      success: true,
      message: "Successfully created",
      data: savedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
};
// update User
export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update user",
    });
  }
};

// delete User
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};

// getSingle User
/* export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    
    console.log(user);
    res.status(200).json({
      success: true,
      message: "Successfully showed",
      data: populateUser,
    });
  } catch (err) {
    console.error(err);
    res.status(404).json({
      success: false,
      message: "User Not found",
    });
  }
}; */

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  //console.log('Fetching user details for ID:', id);

  try {
    const user = await User.findById(id);
    console.log('Fetched user details:', user);

    res.status(200).json({
      success: true,
      message: "Successfully showed",
      data: user,
    });
  } catch (err) {
    console.error(err);
    res.status(404).json({
      success: false,
      message: "User Not found",
    });
  }
};

// getAll User
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      message: "Successfully all datas showed",
      data: users,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

export const confirmedBooking = async (req, res) => {
  const { id, userId } = req.params;
  try {
    const booking = await Booking.findById({
      _id: id,
      userId,
      stripe_payment: true,
    });
    res.status(200).json({
      success: true,
      message: "Successful",
      booking,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "User Not found",
    });
  }
};
