const User = require("../models/userModel");
const CryptoJS = require('crypto-js')

const createUser = async (req, res) => {
  const user = req.body;

  if (!user ||!user.username || !user.email || !user.password) {
    res.status(401);
    throw new Error("Invalid user data!");
  }

  try {
    const users = await User.create(user);
    res.status(200).json(users);
  } catch (error) {
    return res.json({ error: error.message, stackTrace: error.stack });
  }
};

//update user
const updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json("User has been deleted");
  } catch (error) {
    return res.json({ error: error.message, stackTrace: error.stack });
  }
};

//GET ALL USERS
const getAllUsers = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    return res.status(200).json(users);
  } catch (error) {
    return res.json({ error: error.message, stackTrace: error.stack });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    return res.json({ error: error.message, stackTrace: error.stack });
  }
};

const getStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    return res.json({ error: error.message, stackTrace: error.stack });
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
  getStats,
  createUser,
};
