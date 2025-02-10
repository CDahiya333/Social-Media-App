import Notification from "../models/notification.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "username profileImg",
    });

    await Notification.updateMany({ to: userId }, { read: true });

    res.status(200).json(notifications);
  } catch (error) {
    console.log("Error in getNotifications Controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    await Notification.deleteMany({ to: userId });

    res.status(200).json({ message: "Notifications Deleted Successfully" });
  } catch (error) {
    console.log("Error in deleteNotifications Controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteOneNotification = async (req, res) => {
  try {
    const userId = req.user._id;
    const notificationID = req.params.id;
    const notification = await Notification.findById(notificationID);
    if (!notification) {
      return res.status(404).json({ message: "Notification Doesn't Exist" });
    }

    if (notification.to.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "UnAuthorized to Delete Notification" });
    }
    await Notification.findByIdAndDelete(notificationID);
    res.status(200).json({ message: "Notifications Deleted Successfully" });
  } catch (error) {
    console.log("Error in deleteOne Notification Controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
