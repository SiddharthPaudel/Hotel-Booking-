import { useState } from 'react';
import { useAuth } from "../context/AuthContext";
import profile from "../assets/user.png"; // Profile image
import './ProfileModal.css'; // Add styles for the modal
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify

const ProfileModal = ({ showModal, onClose }) => {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });
  const [loading, setLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(null); // To store any error

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const customerId = localStorage.getItem('customerId'); // Get customerId from localStorage
  
    // Check if customerId exists
    if (!customerId) {
      console.error('Customer ID is missing');
      toast.error('Customer ID is missing!'); // Optionally notify user
      return; // Exit early if no customerId is found
    }
  
    setLoading(true); // Set loading state while updating
    setError(null); // Reset error state
  
    try {
      const response = await fetch(`http://localhost:5000/api/customers/${customerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send updated form data
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user data');
      }
  
      const updatedUser = await response.json(); // Parse the updated customer data
  
      // Update localStorage with the updated user data
      localStorage.setItem('user', JSON.stringify(updatedUser));
  
      // Optionally, update the context or global state if using a global state manager
      // setUser(updatedUser); // Uncomment if needed for global state
  
      // Show success notification
      toast.success('Profile updated successfully!');
  
      onClose(); // Close the modal after successful update
  
    } catch (error) {
      console.error('Error:', error);
      setError(error.message); // Set error message to display
  
      // Show error notification with the error message
      toast.error(`Failed to update profile: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  
  

  return (
    showModal && (
      <div className="modal-container">
        <div className="form-container">
          <button className="close-button" onClick={onClose}>✖</button>
          <div className="modal-header">
            <img src={profile} alt="Profile Icon" className="profile-icon" />
            <h2>Edit Profile</h2>
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
          {error && <div className="error-message">{error}</div>} {/* Display error */}
          <div className="modal-footer">
            <button 
              className="btn btn-primary" 
              onClick={handleUpdate}
              disabled={loading} // Disable the button while loading
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ProfileModal;
