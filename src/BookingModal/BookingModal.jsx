import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const BookingModal = ({ showModal, onClose, customerId }) => {
  const [bookedHotels, setBookedHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookedHotels = async () => {
      try {
        if (!customerId) {
          setError("Customer not authenticated");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/booking/${customerId}`
        );

        if (response.status === 200) {
          setBookedHotels(response.data);
        } else {
          setError("No bookings found.");
        }
      } catch (err) {
        console.error("Error fetching booked hotels:", err);
        setError(err.response?.data?.message || "Error fetching booked hotels.");
      } finally {
        setLoading(false);
      }
    };

    if (showModal && customerId) {
      fetchBookedHotels();
    }
  }, [customerId, showModal]);

  const handleNewBooking = async (newBookingData) => {
    try {
      // Create a new booking object with default values (optimistic update)
      const newBooking = {
        hotelName: newBookingData.hotelName || "Newly Booked Hotel",
        location: newBookingData.location || "Unknown Location",
        totalPrice: newBookingData.totalPrice || 100,
        paymentMethod: newBookingData.paymentMethod || "Credit Card",
        checkInDate: newBookingData.checkInDate || new Date().toISOString(),
        checkOutDate: newBookingData.checkOutDate || new Date().toISOString(),
        imageUrl: newBookingData.imageUrl || "https://via.placeholder.com/100"
      };

      // Update UI instantly before sending API request
      setBookedHotels((prevBookings) => [...prevBookings, newBooking]);

      // Send API request to book the hotel
      await axios.post("http://localhost:5000/api/booking", newBookingData);
      console.log("Booking Successful!");
    } catch (error) {
      console.error("Error booking hotel:", error);
    }
  };

  return (
    <Modal show={showModal} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Your Booked Hotels</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : bookedHotels.length > 0 ? (
          <ul className="list-group">
            {bookedHotels.map((hotel, index) => (
              <li key={index} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {hotel.imageUrl && (
                      <img
                        src={hotel.imageUrl}
                        alt={hotel.hotelName}
                        style={{ width: "100px", height: "80px", objectFit: "cover", marginRight: "15px" }}
                      />
                    )}
                    <div>
                      <h6 className="mb-1">{hotel.hotelName}</h6>
                      <small className="text-muted">{hotel.location}</small>
                      <span className="d-block">
                        <strong>Price: </strong>
                        {hotel.totalPrice ? `$${hotel.totalPrice}` : "Not Available"}
                      </span>
                      <span className="d-block">
                        <strong>Payment Method: </strong>
                        {hotel.paymentMethod || "Not Available"}
                      </span>
                      <span className="d-block">
                        <strong>Check-In: </strong>
                        {hotel.checkInDate
                          ? new Date(hotel.checkInDate).toLocaleDateString()
                          : "Not Available"}
                      </span>
                      <span className="d-block">
                        <strong>Check-Out: </strong>
                        {hotel.checkOutDate
                          ? new Date(hotel.checkOutDate).toLocaleDateString()
                          : "Not Available"}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hotels booked yet.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal;
