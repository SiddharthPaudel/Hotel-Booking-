import { Container, Row, Col } from "react-bootstrap";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import Sidebar from "../components/Sidebar";
import CustomerTable from "../cutomer/customer"; // Import the Customer Table component
import HotelDetails from "../hotel_details/hotel"; // Import other sections (e.g., Reports)
import HotelTable from "../hotel_table/HotelTable"
import BookingTable from "../booking/Booking"; // Import other sections (e.g., Settings)
import { useState } from "react";
import "./dashboard.css"; // Import the CSS file

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
);

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("charts"); // Default section (can be 'charts', 'customer', 'reports', etc.)

  // Static Data for Line Chart (Hotel Bookings Over Time)
  const lineChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Hotel Bookings",
        data: [50, 75, 60, 90, 120, 150],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  // Static Data for Pie Chart (Booking Sources)
  const pieChartData = {
    labels: ["Online", "Agent", "Walk-in"],
    datasets: [
      {
        label: "Booking Sources",
        data: [60, 25, 15],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={2}>
          <Sidebar setActiveSection={setActiveSection} />
        </Col>

        {/* Main Content */}
        <Col md={10} className="Dashboard-container">
          {activeSection === "charts" && (
            <>
              <Row className="p-4">
                <Col>
                  <h3>Welcome to Dashboard</h3>
                   <p>Hi, Siddhartha</p>
                </Col>
              </Row>

              {/* Summary Boxes */}
              <Row className="p-4 summary-container">
                <Col xs={12} md={4} className="mb-3 mb-md-0">
                  <div className="summary-box bg-light-red">
                    <h5>Total Bookings</h5>
                    <p>150</p>
                  </div>
                </Col>
                <Col xs={12} md={4} className="mb-3 mb-md-0">
                  <div className="summary-box bg-light-yellow">
                    <h5>Active Customers</h5>
                    <p>75</p>
                  </div>
                </Col>
                <Col xs={12} md={4}>
                  <div className="summary-box bg-light-pink">
                    <h5>Revenue</h5>
                    <p>$12,000</p>
                  </div>
                </Col>
              </Row>
            </>
          )}

          {/* Conditionally render content based on activeSection */}
          <Row className="p-4">
            {activeSection === "charts" && (
              <>
                {/* Charts */}
                <Col md={6}>
                  <div style={{ width: "100%", height: "300px" }}>
                    <Line data={lineChartData} options={lineChartOptions} />
                  </div>
                </Col>

                <Col md={6}>
                  <div style={{ width: "100%", height: "300px" }}>
                    <Pie data={pieChartData} options={pieChartOptions} />
                  </div>
                </Col>
              </>
            )}

            {activeSection === "customer" && (
              <Col md={12}>
                <CustomerTable />
              </Col>
            )}

            {activeSection === "hotel" && (
              <Col md={12}>
                <HotelDetails /> {/* Render the Reports component */}
              </Col>
            )}

            {activeSection === "HotelTable" && (
              <Col md={12}>
                <HotelTable /> {/* Render the Reports component */}
              </Col>
            )}

            {activeSection === "booking" && (
              <Col md={12}>
                <BookingTable /> {/* Render the Settings component */}
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
