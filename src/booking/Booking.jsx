import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

const Booking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/booking")
      .then((response) => {
        console.log("Fetched bookings:", response.data.data); // Debugging step
        setBookings(response.data.data); // Ensure you're setting the correct array
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }, []);

  return (
    <div>
      <h2>All Bookings</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Customer Email</th>
            <th>Hotel Name</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Rooms</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.customerEmail}</td>
                <td>{booking.hotelName}</td>
                <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                <td>{booking.numRooms}</td>
                <td>${booking.totalPrice}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No bookings found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Booking;
