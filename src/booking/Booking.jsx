import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Badge, Container, Spinner } from "react-bootstrap";
import './Booking.css'

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/booking")
      .then((response) => {
        setBookings(response.data?.data || []);
      })
      .catch((error) => {
        setError("Failed to fetch bookings.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Container className="booking-container mt-4">
      <h2 className="text-center mb-4">All Bookings</h2>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : bookings.length === 0 ? (
        <p className="text-center">No bookings found.</p>
      ) : (
        <div className="table-responsive">
          <Table className="modern-table" bordered hover responsive>
            <thead>
              <tr>
                <th>Customer Email</th>
                <th>Hotel Name</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Rooms</th>
                <th>Total Price</th>
                <th>Payment Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.customerEmail}</td>
                  <td>{booking.hotelName}</td>
                  <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                  <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                  <td>{booking.numRooms}</td>
                  <td>${booking.totalPrice}</td>
                  <td>{booking.paymentMethod || "Not Provided"}</td>
                  <td>
                    <Badge
                      className="status-badge"
                      bg={
                        booking.status === "Confirmed"
                          ? "success"
                          : booking.status === "Pending"
                          ? "warning"
                          : "danger"
                      }
                    >
                      {booking.status || "Pending"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default Booking;
