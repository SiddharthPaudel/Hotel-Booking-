import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext"; // Import the custom hook for auth context

const BookingPage = () => {
  const { hotelId } = useParams();
  const { customerId, email: customerEmail } = useAuth(); // Access customerId and customerEmail from AuthContext
  const [hotel, setHotel] = useState({});
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numRooms, setNumRooms] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/hotels/${hotelId}`)
      .then((response) => {
        setHotel(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hotel details:", error);
      });
  }, [hotelId]);

  const handleBooking = async (e) => {
    e.preventDefault();
  
    const pricePerRoom = hotel.pricePerNight;
    const calculatedTotalPrice = pricePerRoom * numRooms;
  
    setTotalPrice(calculatedTotalPrice);
  
    const bookingData = {
      customerId,  // ✅ Send customer ID
      customerEmail, // ✅ Send customer email from AuthContext
      hotelId: hotel._id,
      hotelName: hotel.name, // ✅ Send hotel name
      checkInDate,
      checkOutDate,
      numRooms,
      totalPrice: calculatedTotalPrice,
    };
  
    try {
      await axios.post("http://localhost:5000/api/booking", bookingData);
      toast.success("Booking successful!");
    } catch (error) {
      console.error("Error during booking:", error);
      toast.error("Booking failed. Please try again.");
    }
  };
  
  return (
    <Container className="py-4">
      <h2>Book Your Stay at {hotel.name}</h2>
      <Row className="my-4">
        <Col md={6}>
          <img
            src={hotel.images && hotel.images.length > 0 ? hotel.images[0] : "https://via.placeholder.com/300"}
            alt={hotel.name}
            className="img-fluid"
          />
        </Col>
        <Col md={6}>
          <h4>{hotel.name}</h4>
          <p>{hotel.location}</p>
          <p><strong>${hotel.pricePerNight}</strong> per night</p>
        </Col>
      </Row>

      <Form onSubmit={handleBooking}>
        <Row className="g-3">
          <Col md={4}>
            <Form.Group controlId="checkInDate">
              <Form.Label>Check-in Date</Form.Label>
              <Form.Control
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="checkOutDate">
              <Form.Label>Check-out Date</Form.Label>
              <Form.Control
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="numRooms">
              <Form.Label>Number of Rooms</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={numRooms}
                onChange={(e) => setNumRooms(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <h4>Total Price: ${totalPrice}</h4>

        <Button type="submit" variant="primary">
          Confirm Booking
        </Button>
      </Form>

      <ToastContainer />
    </Container>
  );
};

export default BookingPage;
