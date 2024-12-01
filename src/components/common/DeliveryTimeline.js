import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "../../styles/DeliveryTimeline.scss";

const DeliveryTimeline = () => {
  // Sample delivery updates with ids (Order placed = 1, Delivered = 13)
  const updates = [
    {
      id: 1,
      time: "11/11/2024 18:27",
      status: "Order placed",
      description: "Order is placed.",
    },
    {
      id: 2,
      time: "11/11/2024 19:18",
      status: "Preparing to ship",
      description: "Seller is preparing to ship your parcel.",
    },
    {
      id: 3,
      time: "11/13/2024 15:52",
      status: "Arrived at sorting centre",
      description: "[South Korea] Parcel has arrived at sorting centre.",
    },
    {
      id: 4,
      time: "11/14/2024 08:59",
      status: "Processing for Overseas Shipment",
      description: "[South Korea] Parcel has departed from sorting centre.",
    },
    {
      id: 5,
      time: "11/16/2024 03:44",
      status: "Received at sorting facility",
      description: "Parcel has been received at sorting facility J&T Express.",
    },

    {
      id: 6,
      time: "11/16/2024 05:37",
      status: "Departed sorting facility",
      description: "Parcel has departed from sorting facility.",
    },
    {
      id: 7,
      time: "11/21/2024 08:36",
      status: "In transit",
      description:
        "Parcel is out for delivery. Rider: Armando Tipan Mobile Number: 639082612469",
    },
    {
      id: 8,
      time: "11/21/2024 12:51",
      status: "Delivered",
      description: "Parcel has been delivered. View Proof of Delivery.",
    },
  ];

  // Start with the first update (Order placed, id = 1)
  const [visibleUpdates, setVisibleUpdates] = useState([
    updates.find((update) => update.id === 1),
  ]);

  const handleClickUpdate = () => {
    // Find the id of the last visible update
    const currentUpdateId = visibleUpdates[0].id;

    // Check if there's a next update to show based on id
    if (currentUpdateId < updates.length) {
      const nextUpdate = updates.find(
        (update) => update.id === currentUpdateId + 1
      );

      // Add the next update to the visible updates list
      setVisibleUpdates((prevUpdates) => [nextUpdate, ...prevUpdates]);

      // Apply the 'visible' class to trigger the animation after the update is added
      setTimeout(() => {
        const timelineItem = document.querySelector(
          `.timeline-item[data-id="${nextUpdate.id}"]`
        );
        if (timelineItem) {
          timelineItem.classList.add("visible");
        }
      }, 1000); // Delay to ensure the DOM is updated before adding the class
    }
  };

  return (
    <Container className="timeline-container">
      <div className="timeline">
        {visibleUpdates.map((update) => (
          <div
            className="timeline-item"
            key={update.id}
            data-id={update.id} // Add data-id attribute to uniquely identify the item
            onClick={handleClickUpdate} // Allow repeated clicks to reveal next updates
          >
            <div className="timeline-content">
              <p className="time">{update.time}</p>
              <p className="status">{update.status}</p>
              <p className="description">{update.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default DeliveryTimeline;
