import './App.css';
import AboutUs from './components/AboutUs';
import Service from './components/Service';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation(); // Get current route
  const hideHeaderFooter = location.pathname === '/dashboard'; // Hide Header & Footer on Dashboard

  return (
    <div>
      {/* Conditionally Render Header */}
      {!hideHeaderFooter && <Header />}

      {/* Main Content */}
      <div style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/service" element={<Service />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </div>

      {/* Conditionally Render Footer */}
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
