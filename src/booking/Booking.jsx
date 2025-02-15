import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Badge, Container, Spinner, Form } from "react-bootstrap";
import './Booking.css';

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/booking")
      .then((response) => {
        const data = response.data?.data || [];
        setBookings(data);
        setFilteredBookings(data);
      })
      .catch(() => {
        setError("Failed to fetch bookings.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Handle search by email or hotel name
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = bookings.filter(
      (booking) =>
        booking.customerEmail.toLowerCase().includes(query) ||
        booking.hotelName.toLowerCase().includes(query)
    );

    setFilteredBookings(filtered);
  };

  return (
    <Container className="booking-page-container mt-4">
      <h2 className="text-center mb-4">All Bookings</h2>

      {/* Search Bar */}
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by customer email or hotel name..."
          value={searchQuery}
          onChange={handleSearch}
          className="booking-search-input"
        />
      </Form.Group>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : filteredBookings.length === 0 ? (
        <p className="text-center">No bookings found.</p>
      ) : (
        <div className="table-responsive">
          <Table className="booking-page-table" bordered hover responsive>
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
              {filteredBookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.customerEmail}</td>
                  <td>{booking.hotelName}</td>
                  <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                  <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                  <td>{booking.numRooms}</td>
                  <td>${booking.totalPrice.toFixed(2)}</td>
                  <td>{booking.paymentMethod || "Not Provided"}</td>
                  <td>
                    <Badge
                      className="booking-status-badge"
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
