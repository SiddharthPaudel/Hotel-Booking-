
import { Row, Col } from "react-bootstrap";
import HotelCard from "./HotelCard";

const ListHotel = ( hotels ) => {
  return (
    <Row className="justify-content-center">
      {hotels.map((hotel) => (
        <Col key={hotel.id} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
          <HotelCard hotel={hotel} />
        </Col>
      ))}
    </Row>
  );
};

export default ListHotel;
