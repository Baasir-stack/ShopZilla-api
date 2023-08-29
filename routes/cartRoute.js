const router = require("express").Router();

const {
  validateToken,
  validateTokenAndAuthorization,
  validateTokenAndAdmin
} = require("../service/auth");

const {
  createCart,
  updateCart,
  deleteCart,
  getIndividualCart,
  getAllCarts,
} = require("../controllers.js/cartController");

//GET ALL CART
router.get("/", validateTokenAndAdmin,getAllCarts);

//CREATE CART
router.post("/", validateToken, createCart);

//UPDATE CART
router.patch("/:id", validateTokenAndAuthorization, updateCart);

//DELETE CART
router.delete("/:id", validateTokenAndAuthorization, deleteCart);


//GET INDIVIDUAL CART
router.get("/:userId", validateTokenAndAuthorization,getIndividualCart);

module.exports = router;
