const User = require("../models/userModel");
const CryptoJS = require("crypto-js");
// const { generateToken } = require("../service/auth");
//@desc Register
//@route POST /api/v1/register

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(401);
      throw new Error("All fields must be filled");
    }

    const user = await User.create({
      username,
      email,
      password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.json({ error: error.message, stackTrace: error.stack });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  console.log(req.body)

  if (!username || !password) {
    res.status(400);
    throw new Error("All fields must be filled");
  }

  try {
     //static method call  -created in userModel
     const user = await User.signin(username, password);

    
     return res.status(200).json(user);
  } catch (error) {
    return res.json({ error: error.message, stackTrace: error.stack });
    
  }

  



};

module.exports = { register, login };
