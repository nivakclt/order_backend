const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getRevenue,
  getOrdersPerUser,
} = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/", getOrders);

// Analytics routes must come before /:id
router.get("/analytics/revenue", getRevenue);
router.get("/analytics/users", getOrdersPerUser);

router.get("/:id", getOrderById);
router.patch("/:id/status", updateOrderStatus);
router.delete("/:id", deleteOrder);

module.exports = router;