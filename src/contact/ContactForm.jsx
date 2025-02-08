import  { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "react-toastify/dist/ReactToastify.css";
import "./contact.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ Initialize navigation hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/contact/submit", formData);

      // ✅ Show toast notification
      toast.success("Message sent successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        onClose: () => {
          // ✅ Redirect & scroll to top after toast disappears
          navigate("/");
          window.scrollTo(0, 0);
        },
      });

      // ✅ Reset form fields
      setFormData({ name: "", email: "", phone: "", message: "" });

    } catch (error) {
      toast.error("Failed to send message. Try again later.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }

    setLoading(false);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="contact-form card p-5 shadow-lg border-0 rounded">
        <h2 className="text-center mb-4">Get in Touch</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} className="form-control" rows="4" required></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ContactForm;
