import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Styles (reuse same patterns from garden demo)
const styles = {
  appContainer: {
    fontFamily: "'Roboto', sans-serif",
    background: "linear-gradient(to right, #f5f7fa, #c3cfe2)",
    minHeight: "100vh",
    padding: "20px",
  },
  navBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#364F6B",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  navBarTitle: {
    fontSize: "1.6rem",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  navLinks: {
    display: "flex",
    gap: "15px",
    fontSize: "1rem",
  },
  navLinkBtn: {
    background: "transparent",
    color: "#fff",
    border: "1px solid #fff",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "0.3s",
  },
  navLinkBtnActive: {
    backgroundColor: "#F5A623",
    borderColor: "#F5A623",
    color: "#000",
  },
  contentContainer: {
    backgroundColor: "#ffffffb5",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
};

function NavigationBar({ currentTab, setCurrentTab }) {
  return (
    <div style={styles.navBar}>
      <div style={styles.navBarTitle}>Smart Parking Lot System</div>
      <div style={styles.navLinks}>
        {["spots", "reserve", "debug", "analytics"].map((tab) => (
          <button
            key={tab}
            style={{
              ...styles.navLinkBtn,
              ...(currentTab === tab ? styles.navLinkBtnActive : {}),
            }}
            onClick={() => setCurrentTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

// Simulate parking lot with 4x4 grid (16 spots)
const generateInitialSpots = () =>
  Array.from({ length: 16 }, (_, i) => ({
    id: i,
    status: "free", // "free", "reserved", "occupied"
  }));

function SpotGrid({ spots }) {
  const getColor = (status) => {
    switch (status) {
      case "free":
        return "#7FFF00"; // green
      case "reserved":
        return "#FFD700"; // yellow
      case "occupied":
        return "#FF6347"; // red
      default:
        return "#ccc";
    }
  };

  return (
    <div>
      <h2>Parking Spot Overview</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {spots.map((spot) => (
          <div
            key={spot.id}
            style={{
              height: "80px",
              backgroundColor: getColor(spot.status),
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "6px",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            {`Spot ${spot.id + 1}`}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReserveMenu({ spots, setSpots }) {
  const [selectedSpot, setSelectedSpot] = useState("");

  const handleReserve = () => {
    if (selectedSpot === "") return;
    const updated = spots.map((s) =>
      s.id === parseInt(selectedSpot) ? { ...s, status: "reserved" } : s
    );
    setSpots(updated);
    setSelectedSpot("");
  };

  const handleRelease = () => {
    if (selectedSpot === "") return;
    const updated = spots.map((s) =>
      s.id === parseInt(selectedSpot) ? { ...s, status: "free" } : s
    );
    setSpots(updated);
    setSelectedSpot("");
  };

  return (
    <div>
      <h2>Reserve a Parking Spot</h2>
      <select
        value={selectedSpot}
        onChange={(e) => setSelectedSpot(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      >
        <option value="">Select Spot</option>
        {spots.map((spot) => (
          <option key={spot.id} value={spot.id}>
            Spot {spot.id + 1} ({spot.status})
          </option>
        ))}
      </select>
      <button
        onClick={handleReserve}
        style={{
          backgroundColor: "#FFD700",
          border: "1px solid #aaa",
          padding: "10px",
          marginRight: "10px",
        }}
      >
        Reserve
      </button>
      <button
        onClick={handleRelease}
        style={{
          backgroundColor: "#90EE90",
          border: "1px solid #aaa",
          padding: "10px",
        }}
      >
        Release
      </button>
    </div>
  );
}

function DebugMenu({ spots, setSpots }) {
  const [selectedSpot, setSelectedSpot] = useState("");

  const handleOccupy = () => {
    if (selectedSpot === "") return;
    const updated = spots.map((s) =>
      s.id === parseInt(selectedSpot) ? { ...s, status: "occupied" } : s
    );
    setSpots(updated);
    setSelectedSpot("");
  };

  return (
    <div>
      <h2>Debug Panel – Force Occupy Spots</h2>
      <select
        value={selectedSpot}
        onChange={(e) => setSelectedSpot(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      >
        <option value="">Select Spot</option>
        {spots.map((spot) => (
          <option key={spot.id} value={spot.id}>
            Spot {spot.id + 1} ({spot.status})
          </option>
        ))}
      </select>
      <button
        onClick={handleOccupy}
        style={{
          backgroundColor: "#FF6347",
          border: "1px solid #aaa",
          padding: "10px",
        }}
      >
        Occupy
      </button>
    </div>
  );
}

function AnalyticsPanel({ spots }) {
  const [timeStamps, setTimeStamps] = useState([]);
  const [occupancyData, setOccupancyData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      const count = spots.filter((s) => s.status === "occupied").length;
      setTimeStamps((prev) => [...prev.slice(-9), now]);
      setOccupancyData((prev) => [...prev.slice(-9), count]);
    }, 3000);

    return () => clearInterval(interval);
  }, [spots]);

  const data = {
    labels: timeStamps,
    datasets: [
      {
        label: "Occupied Spots",
        data: occupancyData,
        borderColor: "#FF6347",
        backgroundColor: "#FFB6C1",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Parking Usage Over Time",
      },
    },
  };

  return (
    <div>
      <h2>Analytics</h2>
      <div style={{ maxWidth: "700px" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

function App() {
  const [currentTab, setCurrentTab] = useState("spots");
  const [spots, setSpots] = useState(generateInitialSpots());

  const renderTab = () => {
    switch (currentTab) {
      case "spots":
        return <SpotGrid spots={spots} />;
      case "reserve":
        return <ReserveMenu spots={spots} setSpots={setSpots} />;
      case "debug":
        return <DebugMenu spots={spots} setSpots={setSpots} />;
      case "analytics":
        return <AnalyticsPanel spots={spots} />;
      default:
        return null;
    }
  };

  return (
    <div style={styles.appContainer}>
      <NavigationBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div style={styles.contentContainer}>{renderTab()}</div>
    </div>
  );
}

export default App;
