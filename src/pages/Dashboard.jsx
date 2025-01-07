import React from "react";
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
          <Sidebar />
        </Col>

        {/* Main Content */}
        <Col md={10} className="Dashboard-container">
          <Row className="p-4">
            <Col>
              <h3>Dashboard</h3>
              <p>Hi, Siddhartha</p>
            </Col>
          </Row>

          {/* Charts Side by Side */}
          <Row className="p-4">
            {/* Line Chart */}
            <Col md={6}>
              <div style={{ width: "100%", height: "300px" }}>
                <Line data={lineChartData} options={lineChartOptions} />
              </div>
            </Col>

            {/* Pie Chart */}
            <Col md={6}>
              <div style={{ width: "100%", height: "300px" }}>
                <Pie data={pieChartData} options={pieChartOptions} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
