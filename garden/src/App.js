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

const styles = {
  appContainer: {
    fontFamily: "'Roboto', sans-serif",
    background: "linear-gradient(to bottom right, #d0f7da, #f0fff4)",
    minHeight: "100vh",
    padding: "20px",
  },
  navBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#3A5F0B",
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
    backgroundColor: "#6FBF73",
    borderColor: "#6FBF73",
    color: "#000",
  },
  contentContainer: {
    backgroundColor: "#ffffffb5",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    animation: "fadeIn 1s ease",
  },
  fadeInAnimation: `
    @keyframes fadeIn {
      0% {opacity: 0;}
      100% {opacity: 1;}
    }
  `,
};

// Adding the keyframes to the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerHTML = styles.fadeInAnimation;
document.head.appendChild(styleSheet);

function NavigationBar({ currentTab, setCurrentTab }) {
  return (
    <div style={styles.navBar}>
      <div style={styles.navBarTitle}>Smart Indoor Garden</div>
      <div style={styles.navLinks}>
        <button
          style={{
            ...styles.navLinkBtn,
            ...(currentTab === "monitor" ? styles.navLinkBtnActive : {}),
          }}
          onClick={() => setCurrentTab("monitor")}
        >
          Monitor
        </button>
        <button
          style={{
            ...styles.navLinkBtn,
            ...(currentTab === "control" ? styles.navLinkBtnActive : {}),
          }}
          onClick={() => setCurrentTab("control")}
        >
          Control
        </button>
        <button
          style={{
            ...styles.navLinkBtn,
            ...(currentTab === "analytics" ? styles.navLinkBtnActive : {}),
          }}
          onClick={() => setCurrentTab("analytics")}
        >
          Analytics
        </button>
        <button
          style={{
            ...styles.navLinkBtn,
            ...(currentTab === "profile" ? styles.navLinkBtnActive : {}),
          }}
          onClick={() => setCurrentTab("profile")}
        >
          My Plants
        </button>
        <button
          style={{
            ...styles.navLinkBtn,
            ...(currentTab === "notifications" ? styles.navLinkBtnActive : {}),
          }}
          onClick={() => setCurrentTab("notifications")}
        >
          Alerts
        </button>
      </div>
    </div>
  );
}

// 1. Monitor Tab (SensorPanel)
function SensorPanel() {
  // Fake sensor states
  const [moisture, setMoisture] = useState(45);
  const [temp, setTemp] = useState(22);
  const [humidity, setHumidity] = useState(40);
  const [light, setLight] = useState(300);

  useEffect(() => {
    // Simulated placeholder sensor updates
    const interval = setInterval(() => {
      setMoisture((prev) => {
        let fluctuation = Math.random() * 2 - 1; // -1 to 1
        return Math.min(Math.max(prev + fluctuation, 0), 100);
      });
      setTemp((prev) => {
        let fluctuation = Math.random() * 0.5 - 0.25;
        return Math.round((prev + fluctuation) * 10) / 10;
      });
      setHumidity((prev) => {
        let fluctuation = Math.random() * 1 - 0.5;
        return Math.min(Math.max(prev + fluctuation, 0), 100);
      });
      setLight((prev) => {
        let fluctuation = Math.random() * 10 - 5;
        return Math.max(prev + fluctuation, 0);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Live Sensor Readings</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <div
          style={{
            flex: 1,
            background: "#CFE8CF",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <h3>Soil Moisture</h3>
          <p style={{ fontSize: "2em" }}>{moisture.toFixed(1)}%</p>
        </div>
        <div
          style={{
            flex: 1,
            background: "#FFE5B4",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <h3>Temperature</h3>
          <p style={{ fontSize: "2em" }}>{temp.toFixed(1)}°C</p>
        </div>
        <div
          style={{
            flex: 1,
            background: "#D6EAF8",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <h3>Humidity</h3>
          <p style={{ fontSize: "2em" }}>{humidity.toFixed(1)}%</p>
        </div>
        <div
          style={{
            flex: 1,
            background: "#FFFACD",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <h3>Light Intensity</h3>
          <p style={{ fontSize: "2em" }}>{light.toFixed(0)} lux</p>
        </div>
      </div>
    </div>
  );
}

// 2. Control Tab (ControlPanel) with buttons & toggles
function ControlPanel() {
  const [isWaterPumpOn, setIsWaterPumpOn] = useState(false);
  const [isGrowLightOn, setIsGrowLightOn] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [fertilizerLevel, setFertilizerLevel] = useState(75); // out of 100

  const togglePump = () => {
    setIsWaterPumpOn((prev) => !prev);
  };

  const toggleLight = () => {
    setIsGrowLightOn((prev) => !prev);
  };

  const toggleAutoMode = () => {
    setAutoMode((prev) => !prev);
  };

  const addFertilizer = () => {
    setFertilizerLevel((prev) => Math.min(prev + 10, 100));
  };

  return (
    <div>
      <h2>Control Your Garden</h2>
      <div style={{ marginBottom: "15px" }}>
        <button
          style={{
            backgroundColor: isWaterPumpOn ? "#B3E8B3" : "#f0f0f0",
            border: "2px solid #3A5F0B",
            padding: "10px 20px",
            marginRight: "10px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={togglePump}
        >
          {isWaterPumpOn ? "Turn Off Water Pump" : "Turn On Water Pump"}
        </button>

        <button
          style={{
            backgroundColor: isGrowLightOn ? "#FCEFA1" : "#f0f0f0",
            border: "2px solid #FFD700",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={toggleLight}
        >
          {isGrowLightOn ? "Turn Off Grow Light" : "Turn On Grow Light"}
        </button>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <button
          style={{
            backgroundColor: autoMode ? "#98FB98" : "#f0f0f0",
            border: "2px solid #006400",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "5px",
            marginRight: "10px",
          }}
          onClick={toggleAutoMode}
        >
          {autoMode ? "Disable Auto-Mode" : "Enable Auto-Mode"}
        </button>
        <button
          style={{
            backgroundColor: "#B4CFB0",
            border: "2px solid #336600",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={addFertilizer}
        >
          Add Fertilizer
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <p>
          <strong>Current Fertilizer Level:</strong> {fertilizerLevel} / 100
        </p>
        <div
          style={{
            width: "200px",
            height: "25px",
            background: "#eee",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${fertilizerLevel}%`,
              height: "100%",
              background: "#7FFF00",
              transition: "width 0.5s ease",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

// 3. Analytics Tab (AnalyticsPanel) with charts
function AnalyticsPanel() {
  const [timeStamps, setTimeStamps] = useState([]);
  const [moistureData, setMoistureData] = useState([]);
  const [tempData, setTempData] = useState([]);

  // Simulated data feed
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeStamps((prev) => [...prev, new Date().toLocaleTimeString()].slice(-10));
      setMoistureData((prev) => [
        ...prev,
        40 + Math.random() * 10,
      ].slice(-10));
      setTempData((prev) => [...prev, 20 + Math.random() * 5].slice(-10));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: timeStamps,
    datasets: [
      {
        label: "Soil Moisture (%)",
        data: moistureData,
        borderColor: "#3A5F0B",
        backgroundColor: "#B3E8B3",
        yAxisID: "y",
      },
      {
        label: "Temperature (°C)",
        data: tempData,
        borderColor: "#FF5733",
        backgroundColor: "#FFD2C2",
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Recent Sensor Trends",
        font: { size: 18 },
      },
      legend: {
        position: "bottom",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        min: 0,
        max: 100,
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        min: 0,
        max: 40,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div>
      <h2>Analytics & Trends</h2>
      <p style={{ marginBottom: "1rem" }}>
        Below is a dynamic chart showing the most recent sensor readings for
        moisture and temperature.
      </p>
      <div style={{ width: "100%", height: "400px" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

// 4. Plant Profile Tab (PlantProfile) with multiple plants, pictures, and more
function PlantProfile() {
  const [plants, setPlants] = useState([
    {
      id: 1,
      name: "Basil",
      photo:
        "https://images.unsplash.com/photo-1611412263629-1db24f34b4cf?auto=format&fit=crop&w=400&q=80",
      notes: "Loves sunlight and consistent watering every 2 days.",
    },
    {
      id: 2,
      name: "Mint",
      photo:
        "https://images.unsplash.com/photo-1590086872039-8cdf2118555f?auto=format&fit=crop&w=400&q=80",
      notes: "Keep soil moist. Great for fresh tea!",
    },
    {
      id: 3,
      name: "Tomato",
      photo:
        "https://images.unsplash.com/photo-1630523205302-9ead04bd7ba1?auto=format&fit=crop&w=400&q=80",
      notes: "Thrives under plenty of light and consistent feeding.",
    },
  ]);

  const [newPlant, setNewPlant] = useState({ name: "", photo: "", notes: "" });

  const addPlant = () => {
    if (!newPlant.name || !newPlant.photo) return;
    setPlants((prev) => [
      ...prev,
      { id: Date.now(), ...newPlant },
    ]);
    setNewPlant({ name: "", photo: "", notes: "" });
  };

  return (
    <div>
      <h2>My Plants</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {plants.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "#fff",
            }}
          >
            <img src={p.photo} alt={p.name} style={{ width: "100%" }} />
            <div style={{ padding: "10px" }}>
              <h3>{p.name}</h3>
              <p>{p.notes}</p>
            </div>
          </div>
        ))}
      </div>

      <hr style={{ margin: "20px 0" }} />
      <h3>Add a New Plant</h3>
      <input
        type="text"
        placeholder="Name"
        value={newPlant.name}
        onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
        style={{ marginRight: "10px" }}
      />
      <input
        type="text"
        placeholder="Photo URL"
        value={newPlant.photo}
        onChange={(e) => setNewPlant({ ...newPlant, photo: e.target.value })}
        style={{ marginRight: "10px", width: "300px" }}
      />
      <input
        type="text"
        placeholder="Notes"
        value={newPlant.notes}
        onChange={(e) => setNewPlant({ ...newPlant, notes: e.target.value })}
        style={{ marginRight: "10px" }}
      />
      <button
        onClick={addPlant}
        style={{
          backgroundColor: "#B3E8B3",
          border: "2px solid #3A5F0B",
          padding: "6px 12px",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Add
      </button>
    </div>
  );
}

// 5. Notifications Tab (NotificationPanel) with a list of system-generated alerts
function NotificationPanel() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Simulate random system alerts
    const interval = setInterval(() => {
      const alertProbability = Math.random();
      if (alertProbability < 0.3) {
        // 30% chance to generate an alert
        const alertTypes = [
          "Soil moisture below threshold!",
          "Water tank running low!",
          "Temperature too high!",
          "Fertilizer level critically low!",
          "Light intensity insufficient!",
          "High humidity detected!"
        ];
        const randomIndex = Math.floor(Math.random() * alertTypes.length);
        const newAlert = {
          id: Date.now(),
          message: alertTypes[randomIndex],
          time: new Date().toLocaleTimeString(),
        };
        setAlerts((prev) => [newAlert, ...prev]);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>System Alerts & Notifications</h2>
      <p>Automatic alerts generated whenever the system detects anomalies.</p>
      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "6px",
          backgroundColor: "#FFEFEF",
        }}
      >
        {alerts.length === 0 ? (
          <p>No alerts yet.</p>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              style={{
                backgroundColor: "#FFCFCF",
                marginBottom: "5px",
                padding: "5px 10px",
                borderRadius: "4px",
              }}
            >
              <strong>{alert.time}</strong> – {alert.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// The main App component controlling tab navigation
function App() {
  const [currentTab, setCurrentTab] = useState("monitor");

  const renderContent = () => {
    switch (currentTab) {
      case "monitor":
        return <SensorPanel />;
      case "control":
        return <ControlPanel />;
      case "analytics":
        return <AnalyticsPanel />;
      case "profile":
        return <PlantProfile />;
      case "notifications":
        return <NotificationPanel />;
      default:
        return <SensorPanel />;
    }
  };

  return (
    <div style={styles.appContainer}>
      <NavigationBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div style={styles.contentContainer}>{renderContent()}</div>
    </div>
  );
}

export default App;
