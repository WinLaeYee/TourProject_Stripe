import Tour from "../models/Tour.js";

//create tour

export const createTour = async (req, res) => {
  try {
    const { title, city, address, distance, desc, price, maxGroupSize } =
      req.body;

    const file = {
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };

    console.log("bkn", file);

    const newTour = new Tour({
      title,
      city,
      address,
      distance,
      desc,
      price,
      maxGroupSize,
      photo: file,
    });
    console.log('new tour:', newTour)

    const result = await newTour.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: result,
    });
    console.log("this is result", result);
   
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create. Try again",
    });
  }
};

//update tour
export const updateTour = async (req, res) => {
  const { title, city, address,distance, desc, price, maxGroupSize } =
    req.body;
  const id = req.params.id;
  const photo = req.file;

  console.log("file lenght", photo?.filename);
  console.log("id is", id)

  const fileData = {
    fileName: photo?.originalname,
    filePath: photo?.path,
    fileType: photo?.mimetype,
    fileSize: fileSizeFormatter(photo?.size, 2),
  };

  let updatedTour;
  try {
    if (photo && photo?.filename !== undefined) {
      updatedTour = await Tour.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            title: title,
            city: city,
            address: address,
            distance: distance,
            desc: desc,
            price: price,
            maxGroupSize: maxGroupSize,
            photo: fileData,
          },
        },
        { new: true }
      );
    } else {
      updatedTour = await Tour.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            title: title,
            city: city,
            address: address,
            distance: distance,
            desc: desc,
            price: price,
            maxGroupSize: maxGroupSize,
          },
        },
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedTour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
    });
  }
};


// delete tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;

  console.log(" delete id is", id);

  try {
    const deletedTour = await Tour.findByIdAndDelete(id);

    if (!deletedTour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tour deleted successfully',
      
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete tour',
    });
  }
};

// getSingle tour
export const getSingleTour = async (req, res) => {
  const id = req.params.id;

  try {
    const tour = await Tour.find({ _id: id })
    // const tour = await Tour.findById(id);
    .populate("reviews")
    res.status(200).json({
      success: true,
      message: "Successfully showed",
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

// getAll tour
export const getAllTour = async (req, res) => {
  //for pagination
  const page = parseInt(req.query.page);

  console.log("page is",page)

  try {
    const tours = await Tour.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);

     
    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successfully all datas showed",
      data: tours,
    });

    console.log("tours data is", tours);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

//get tour by search
export const getTourBySearch = async (req, res) => {
  //here 'i' means case sensitive
  const city = new RegExp(req.query.city, "i");
  //const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    //gte means greater than equal
    const tours = await Tour.find({
      city,
      //distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");

    res.status(200).json({
      success: true,
      message: "Successfully showed by search",
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

// get featured tour
export const getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true })
      .populate("reviews")
      .limit(8);

    res.status(200).json({
      success: true,
      message: "Successfully all featured tours showed",
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

//get tour counts
export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({ success: true, data: tourCount });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to fetch" });
  }
};

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + "" + sizes[index]
  );
};
