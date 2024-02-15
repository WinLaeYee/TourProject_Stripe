import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  
  const token = req.cookies.accessToken;
  //console.log("Received token ", token);
  //console.log("req cookie ", req.cookies);

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "You're not authorize,You have no TOKEN" });
  }

  //if token is exist then verify the token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "token is invalid" });
    }

    req.user = user;
    next(); 
  });
};

 export const verifyUser = (req, res, next) => {
  verifyToken(req, res,() => {
    if (req.user.id === req.params.id || req.user.role === "admin") {
      console.log("id is", req.params.id);
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "You're not authenticated USER" });
    }
  });
}; 

/* export const verifyUser = (req, res, next) => {
  verifyToken(req, res,() => {
    if (req.user) {
      console.log("id is", req.params.id);
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "You're not authenticated USER" });
    }
  });
}; */

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      //console.log("user role",req.user.role );
      next();

    } else {
      return res
        .status(401)
        .json({ success: false, message: "You're not ADMIN" });
    }
  });
};


