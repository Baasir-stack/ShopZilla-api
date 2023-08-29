const Order = require("../models/orderModel");

//@desc Create ORDER
//@route POST /api/v1/orders
const createOrder = async (req, res) => {
  if (!req.body) {
    res.status(401);
    throw new Error("All fields must be filled");
  }
  try {
    const order = await Order.create(req.body);

    return res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message, stackTrace: error.stack });
  }
};

//@desc Update Order
//@route POST /api/v1/orders/:id

const updateOrder = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error("Please provide the product ID");
    }

    if (!req.body) {
      throw new Error("All fields must be filled");
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedOrder) {
      throw new Error("Order not found");
    }

    return res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message, stackTrace: error.stack });
  }
};

//DELETE
const deleteOrder = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error("Please provide ID");
    }
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (error) {
    res.status(500).json({ error: error.message, stackTrace: error.stack });
  }
};

//GET A CART
const getIndividualOrder = async (req, res) => {
  try {
    if (!req.params.userId) {
      throw new Error("Please provide ID");
    }
    const order = await Order.find({ userId: req.params.userId });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message, stackTrace: error.stack });
  }
};

//GET ALL PRODUCTS
const getAllOrders = async (req, res) => {
  try {
    const order = await Order.find();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message, stackTrace: error.stack });
  }
};

// STATS /INCOME

const getStats = async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
      {
        $sort: {
          _id: 1, // Sort by month in ascending order (1) or -1 for descending order
        },
      },
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ error: error.message, stackTrace: error.stack });
  }
};


module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getIndividualOrder,
  getAllOrders,
  getStats,
};
