const jwt = require("jsonwebtoken");



const generateToken = (user) => {
  try {
    const payload = {
      id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign(payload, process.env.JWT_SEC);

    return token;
  } catch (error) {
    // Handle the error within the function by throwing it
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};


const validateToken = async (req, res, next) => {
  const { authorization: authHeader } = req.headers;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const validateTokenAndAuthorization = (req, res, next) => {
    validateToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };


  const validateTokenAndAdmin = (req, res, next) => {
    validateToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };

module.exports = { generateToken, validateToken, validateTokenAndAuthorization, validateTokenAndAdmin };
