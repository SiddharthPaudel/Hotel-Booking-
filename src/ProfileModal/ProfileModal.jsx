import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import profile from "../assets/user.png";
import { toast } from "react-toastify";
import { useSpring, animated } from "@react-spring/web";
import "./ProfileModal.css"; // CSS for styling
import "react-toastify/dist/ReactToastify.css";

const ProfileModal = ({ showModal, onClose }) => {
  const { user, setUser, customerId: contextCustomerId } = useAuth();
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });
  const [loading, setLoading] = useState(false);

  const [customerId, setCustomerId] = useState(null);

  // Modal animation for smooth fade-in and scale-up
  const modalAnimation = useSpring({
    opacity: showModal ? 1 : 0,
    transform: showModal ? "scale(1)" : "scale(0.9)",
    config: { tension: 200, friction: 20 },
  });

  useEffect(() => {
    if (contextCustomerId) {
      setCustomerId(contextCustomerId);
    } else {
      const storedCustomerId = localStorage.getItem("customerId");
      if (storedCustomerId) {
        setCustomerId(storedCustomerId);
      }
    }
  }, [contextCustomerId]);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user, showModal]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!customerId) {
      console.error("Customer ID is missing");
      toast.error("Customer ID is missing! Please try again.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/customers/${customerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const updatedUser = await response.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));
      if (setUser) {
        setUser(updatedUser);
      }

      toast.success("Profile updated successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
      onClose(); // Close modal
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(`Failed to update profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    showModal && (
      <animated.div className="modal-container" style={modalAnimation}>
        <div className="form-container">
          <button className="close-button" onClick={onClose}>
            ✖
          </button>
          <div className="modal-header">
            <img src={profile} alt="Profile Icon" className="profile-icon" />
            <h2>{user.username}</h2>
          </div>
          <div className="modal-body">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="form-control"
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-primary"
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </animated.div>
    )
  );
};

export default ProfileModal;
