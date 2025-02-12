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
import Booking from "../booking/Booking"; // Import other sections (e.g., Settings)
import ContactTable from "../contact/ContactTable";
import { useState, useEffect } from "react";
import axios from "axios";
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
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    activeCustomers: 0,
    totalRevenue: 0,
    bookingData: [],
    paymentMethods: [],
  });

  // Fetch dashboard data from the API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard"); // Update with your actual API endpoint
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // Line Chart Data (Bookings over Time)
  const lineChartData = {
    labels: dashboardData.bookingData.map((item) => item.month),
    datasets: [
      {
        label: "Hotel Bookings",
        data: dashboardData.bookingData.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  // Pie Chart Data (Payment Methods)
  const pieChartData = {
    labels: dashboardData.paymentMethods.map((method) => method.paymentMethod),
    datasets: [
      {
        label: "Payment Methods",
        data: dashboardData.paymentMethods.map((method) => method.count),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
                    <p>{dashboardData.totalBookings}</p>
                  </div>
                </Col>
                <Col xs={12} md={4} className="mb-3 mb-md-0">
                  <div className="summary-box bg-light-yellow">
                    <h5>Active Customers</h5>
                    <p>{dashboardData.activeCustomers}</p>
                  </div>
                </Col>
                <Col xs={12} md={4}>
                  <div className="summary-box bg-light-pink">
                    <h5>Revenue</h5>
                    <p>${dashboardData.totalRevenue}</p>
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
                <Booking /> {/* Render the Settings component */}
              </Col>
            )}
            {activeSection === "contact" && (
              <Col md={12}>
                <ContactTable/> {/* Render the Settings component */}
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
