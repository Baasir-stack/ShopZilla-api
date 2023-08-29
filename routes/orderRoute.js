const router = require('express').Router()
const {
    validateToken,
    validateTokenAndAuthorization,
    validateTokenAndAdmin,
  } = require("../service/auth");
  
  const {
    createOrder,
    updateOrder,
    deleteOrder,
    getIndividualOrder,
    getAllOrders,
    getStats 
  } = require("../controllers.js/orderController");
  
  //GET ALL Order
  router.get("/", validateTokenAndAdmin,getAllOrders);
  
  //CREATE Order
  router.post("/", validateToken, createOrder);

  //stats
  router.get("/stats", validateTokenAndAdmin,getStats);

  
  //UPDATE Order
  router.patch("/:id", validateTokenAndAdmin, updateOrder);
  
  //DELETE Order
  router.delete("/:id", validateTokenAndAdmin, deleteOrder);
  
  
  //GET INDIVIDUAL Order
  router.get("/:userId", validateTokenAndAuthorization,getIndividualOrder);



module.exports  =router
