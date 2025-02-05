import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./hotel.css";

const HotelForm = ({ onAddHotel }) => {
  const [newHotel, setNewHotel] = useState({
    name: "",
    location: "",
    images: [], // Store preview URLs
    imageFiles: [], // Store actual files
    description: "",
    pricePerNight: "",
    rooms: "Available",
  });

  // Handle file drop for multiple images
  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => ({
      preview: URL.createObjectURL(file), // Generate preview URL
      file, // Store actual file
    }));

    setNewHotel((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages.map((img) => img.preview)], // Store preview URLs
      imageFiles: [...prev.imageFiles, ...newImages.map((img) => img.file)], // Store actual files
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true, // Allow multiple images
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHotel({ ...newHotel, [name]: value });
  };

  // Handle form submission
  const handleAddHotel = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newHotel.name);
      formData.append("location", newHotel.location);
      formData.append("description", newHotel.description);
      formData.append("pricePerNight", newHotel.pricePerNight);
      formData.append("rooms", newHotel.rooms);
  
      // Append multiple images
      newHotel.imageFiles.forEach((file) => {
        formData.append("images", file); // 'images' must match multer.array('images', 5)
      });
  
      // Send request to backend
      const response = await axios.post("http://localhost:5000/api/hotels", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.status === 201) {
        toast.success("Hotel added successfully!", { position: "top-right", autoClose: 3000 });
  
        // Reset the form after success
        setNewHotel({
          name: "",
          location: "",
          images: [],
          imageFiles: [],
          description: "",
          pricePerNight: "",
          rooms: "Available",
        });
      }
    } catch (error) {
      console.error("Error adding hotel:", error);
      toast.error("Failed to add hotel", { position: "top-center", autoClose: 3000 });
    }
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

        <Form.Group controlId="formHotelLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={newHotel.location}
            onChange={handleInputChange}
            placeholder="Enter hotel location"
          />
        </Form.Group>

        <Form.Group controlId="formHotelImages">
          <Form.Label>Images</Form.Label>
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag & drop images here, or click to select multiple</p>
          </div>
          <div className="image-preview-container">
            {newHotel.images.map((src, index) => (
              <img key={index} src={src} alt={`Hotel ${index}`} className="hotel-image-preview" width="100" height="70" />
            ))}
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
          <Form.Control as="select" name="rooms" value={newHotel.rooms} onChange={handleInputChange}>
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </Form.Control>
        </Form.Group>

        <div className="d-flex justify-content-center mt-3">
          <Button variant="primary" type="button" onClick={handleAddHotel}>
            Add Hotel
          </Button>
        </div>
      </Form>

      <ToastContainer />
    </div>
  );
};

export default HotelForm;
