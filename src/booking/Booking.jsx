import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spinner, Container } from "react-bootstrap"; // You can use react-bootstrap to style the table

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]); // Store customers
  const [hotels, setHotels] = useState([]); // Store hotels
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(""); // State to track error

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsResponse, customersResponse, hotelsResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/booking"),
          axios.get("http://localhost:5000/api/customers"),
          axios.get("http://localhost:5000/api/hotels"),
        ]);

        setBookings(bookingsResponse.data);
        setCustomers(customersResponse.data);
        setHotels(hotelsResponse.data);
        setLoading(false); // Set loading to false when data is fetched

        // Log the fetched data to the console
        console.log("Bookings Data:", bookingsResponse.data);
        console.log("Customers Data:", customersResponse.data);
        console.log("Hotels Data:", hotelsResponse.data);
      } catch (error) {
        setError("Error fetching bookings.");
        setLoading(false); // Set loading to false in case of an error
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to get the customer email based on customerId
  const getCustomerEmail = (customerId) => {
    const customer = customers.find((cust) => cust._id === customerId);
    console.log('Looking for customer:', customerId, 'Found:', customer);
    return customer ? customer.email : "Unknown Customer";
  };

  // Function to get the hotel name based on hotelId
  const getHotelName = (hotelId) => {
    const hotel = hotels.find((htl) => htl._id === hotelId);
    console.log('Looking for hotel:', hotelId, 'Found:', hotel);
    return hotel ? hotel.name : "Unknown Hotel";
  };

  return (
    <Container>
      <h2>Admin - All Bookings</h2>

      {loading && <Spinner animation="border" />} {/* Display loading spinner */}
      {error && <div className="alert alert-danger">{error}</div>} {/* Display error if any */}

      {!loading && !error && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Customer Email</th>
              <th>Hotel Name</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Rooms</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{getCustomerEmail(booking.customerId)}</td>
                  <td>{getHotelName(booking.hotelId)}</td>
                  <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                  <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                  <td>{booking.numRooms}</td>
                  <td>${parseFloat(booking.totalPrice).toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No bookings available.</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Booking;
