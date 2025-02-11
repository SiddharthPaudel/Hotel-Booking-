import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Dropdown, Card, Image } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext"; // Import the custom hook for auth context
import cash from "../assets/cash.png";
import esewa from "../assets/esewa1.png";
import online from "../assets/online.png";
import khalti from "../assets/khalti.png";

const BookingPage = () => {
  const { hotelId } = useParams();
  const { customerId, email: customerEmail } = useAuth(); // Access customerId and customerEmail from AuthContext
  const [hotel, setHotel] = useState({});
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numRooms, setNumRooms] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash"); // Default to Cash

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/hotels/${hotelId}`)
      .then((response) => {
        setHotel({
          ...response.data,
          images: response.data.images
            ? response.data.images.map((img) =>
                img.startsWith("http")
                  ? img
                  : `http://localhost:5000/hotel_images/${img}`
              )
            : [],
        });
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
      paymentMethod, // Send selected payment method
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
    <Container className="py-4" style={{ maxWidth: "900px" }}>
      <h2 className="mb-4 text-center">Book Your Stay at {hotel.name}</h2>

      {/* Hotel Image Section */}
      <Row className="my-4">
        <Col md={12} className="mb-4">
          <Card>
            <Card.Img
              variant="top"
              src={hotel.images && hotel.images.length > 0 ? hotel.images[0] : "https://via.placeholder.com/600x400"}
              alt={hotel.name}
              className="img-fluid rounded"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100px", // Set height for better image display
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Hotel Details Section */}
      <Row className="mb-4">
        <Col md={8}>
          <h4>{hotel.name}</h4>
          <p>{hotel.location}</p>
          <p><strong>${hotel.pricePerNight}</strong> per night</p>
        </Col>
      </Row>

      {/* Booking Form Section */}
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

        {/* Payment Method Section */}
        <Form.Group controlId="paymentMethod" className="mt-4">
          <Form.Label>Payment Method</Form.Label>
          <Dropdown
            onSelect={(selectedKey) => setPaymentMethod(selectedKey)}
            className="d-flex align-items-center"
            style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "8px" }}
          >
            <Dropdown.Toggle variant="light" id="payment-method-dropdown" className="w-100">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={paymentMethod === "cash" ? cash : paymentMethod === "esewa" ? esewa : online}
                  alt={paymentMethod}
                  style={{ width: "24px", marginRight: "10px" }}
                />
                {paymentMethod === "cash" ? "Cash" : paymentMethod === "esewa" ? "Esewa" : "Online Banking"}
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
  <Dropdown.Item eventKey="cash">
    <img src={cash} alt="Cash" style={{ width: "32px", height: "32px", marginRight: "10px" }} /> Cash
  </Dropdown.Item>
  <Dropdown.Item eventKey="esewa">
    <img src={khalti} alt="khalti" style={{ width: "40px", height: "40px", marginRight: "10px" }} /> Khalti
  </Dropdown.Item>
  <Dropdown.Item eventKey="banking">
    <img src={online} alt="Online Banking" style={{ width: "32px", height: "32px", marginRight: "10px" }} /> Online Banking
  </Dropdown.Item>
</Dropdown.Menu>

          </Dropdown>
        </Form.Group>

        <h4 className="mt-3 text-center">
          Total Price: <strong>${totalPrice}</strong>
        </h4>

        <Button
          type="submit"
          variant="primary"
          className="w-100 mt-4"
          style={{ padding: "12px 0", borderRadius: "8px" }}
        >
          Confirm Booking
        </Button>
      </Form>

      <ToastContainer />
    </Container>
  );
};

export default BookingPage;
