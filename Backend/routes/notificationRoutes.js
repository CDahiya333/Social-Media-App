import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  getNotifications,
  deleteNotifications,
  deleteOneNotification,
} from "../controllers/notificationController.js";
const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotifications);
//Deleting a Specific Notification
router.delete("/:id", protectRoute, deleteOneNotification);

export default router;
