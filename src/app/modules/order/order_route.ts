import express from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { OrderValidation } from "./order_validationZodSchema";
import { OrderController } from "./order_controller";

const router = express.Router();

// create order
router.post(
  "/create",
  auth("user"),
  validateRequest(OrderValidation.createOrderValidationZodSchema),
  OrderController.createOrder,
);

// delivery status update.
router.put(
  "/:id/update-status",
  auth("admin", "developer", "superAdmin"),
  validateRequest(OrderValidation.updateOrderStatusZodSchema),
  OrderController.updateOrderStatus,
);
export const OrderRoutes = router;
