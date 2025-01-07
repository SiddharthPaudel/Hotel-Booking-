
import { Card, Button } from "react-bootstrap";

const HotelCard = (hotel ) => {
  return (
    <Card className="mb-4 shadow-sm" style={{ minWidth: "16rem" }}>
      <Card.Img variant="top" src={hotel.image} alt={hotel.name} style={{ height: "200px", objectFit: "cover" }} />
      <Card.Body>
        <Card.Title>{hotel.name}</Card.Title>
        <Card.Text>
          <strong>Price:</strong> ${hotel.price} per night
        </Card.Text>
        <Button variant="primary" className="w-100" onClick={() => alert(`Booking ${hotel.name}`)}>
          Book Now
        </Button>
      </Card.Body>
    </Card>
  );
};

export default HotelCard;
