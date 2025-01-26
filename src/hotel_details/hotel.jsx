import  { useState } from "react";
import { Form, Button} from "react-bootstrap";
import { FaSearch } from "react-icons/fa"; // Search icon
import { useDropzone } from "react-dropzone"; // For drag-and-drop
import './hotel.css'; // Shared styles

const HotelForm = ({ onAddHotel }) => {
  const [newHotel, setNewHotel] = useState({
    name: "",
    image: "",
    description: "",
    pricePerNight: "",
    rooms: "Available",
  });

  const [searchTerm, setSearchTerm] = useState("");

  // Handle image upload (drag and drop or file picker)
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setNewHotel({ ...newHotel, image: URL.createObjectURL(file) });
  };

  // Set up the dropzone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Accept only images
  });

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHotel({ ...newHotel, [name]: value });
  };

  // Handle form submission
  const handleAddHotel = () => {
    onAddHotel(newHotel);
    setNewHotel({ name: "", image: "", description: "", pricePerNight: "", rooms: "Available" });
  };

  return (
    <div className="add-hotel-form">
      <h4>Add New Hotel</h4>
      <Form>
        <Form.Group controlId="formHotelName">
          <Form.Label>Hotel Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={newHotel.name}
            onChange={handleInputChange}
            placeholder="Enter hotel name"
          />
        </Form.Group>

        {/* Drag-and-Drop Image Upload */}
        <Form.Group controlId="formHotelImage">
          <Form.Label>Image</Form.Label>
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag & drop an image here, or click to select</p>
            {newHotel.image && (
              <img
                src={newHotel.image}
                alt="Hotel"
                className="hotel-image-preview"
                width="100"
                height="70"
              />
            )}
          </div>
        </Form.Group>

        <Form.Group controlId="formHotelDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={newHotel.description}
            onChange={handleInputChange}
            placeholder="Enter hotel description"
          />
        </Form.Group>

        <Form.Group controlId="formHotelPrice">
          <Form.Label>Price per Night</Form.Label>
          <Form.Control
            type="number"
            name="pricePerNight"
            value={newHotel.pricePerNight}
            onChange={handleInputChange}
            placeholder="Enter price per night"
          />
        </Form.Group>

        <Form.Group controlId="formHotelRooms">
          <Form.Label>Room Status</Form.Label>
          <Form.Control
            as="select"
            name="rooms"
            value={newHotel.rooms}
            onChange={handleInputChange}
          >
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </Form.Control>
        </Form.Group>

        {/* Center Add Hotel Button */}
        <div className="d-flex justify-content-center mt-3">
          <Button
            variant="primary"
            type="button"
            onClick={handleAddHotel}
          >
            Add Hotel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default HotelForm;
