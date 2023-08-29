const Cart = require("../models/cartModel");

//@desc Create Cart
//@route POST /api/v1/cart
const createCart = async (req, res) => {
  if (!req.body) {
    res.status(401);
    throw new Error("All fields must be filled");
  }
  try {
    const cart = await Cart.create(req.body);

    return res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message, stackTrace: error.stack });
  }
};

//@desc Update Cart
//@route POST /api/v1/products/:id

const updateCart = async (req, res) => {
  try {
    
    if (!req.params.id) {
      throw new Error("Please provide the product ID");
    }

    if (!req.body) {
      throw new Error("All fields must be filled");
    }

    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedCart) {
      throw new Error("Cart not found");
    }


    return res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message, stackTrace: error.stack });
  }
};

//DELETE
const deleteCart = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error("Please provide ID");
    }
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (error) {
    res.status(500).json({ error: error.message, stackTrace: error.stack });
  }
};

//GET A CART
const getIndividualCart = async (req, res) => {

  try {
    if (!req.params.userId) {
      throw new Error("Please provide ID");
    }
    const cart = await Cart.findOne({userId:req.params.userId});
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message, stackTrace: error.stack });
  }
};



//GET ALL PRODUCTS
const getAllCarts =  async (req, res) => {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (error) {
    res.status(500).json({ error: error.message, stackTrace: error.stack });
    }
  };

module.exports = { 
    createCart, 
    updateCart,
     deleteCart, 
     getIndividualCart,
     getAllCarts
     };
