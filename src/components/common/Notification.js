import React, { useState, useEffect } from "react";
import "../../styles/Notification.scss"; // Assuming the notification styles are here

const Notifications = ({ notifications }) => {
  return (
    <div className="notifications-container">
      {notifications.map((notification) => (
        <div key={notification.id} className="notification">
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default Notifications;
