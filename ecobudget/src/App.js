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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const styles = {
  appContainer: {
    fontFamily: "'Roboto', sans-serif",
    background: "linear-gradient(to bottom right, #e0f7fa, #f1f8e9)",
    minHeight: "100vh",
    padding: "20px",
  },
  navBar: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#00695c",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    marginBottom: "20px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
  navBarTitle: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  navButton: {
    backgroundColor: "transparent",
    color: "#fff",
    border: "2px solid #fff",
    padding: "8px 14px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  navButtonActive: {
    backgroundColor: "#80cbc4",
    borderColor: "#80cbc4",
    color: "#000",
  },
  contentContainer: {
    backgroundColor: "#ffffffcc",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    animation: "fadeIn 1s ease",
  },
  // Define keyframe for fadeIn
  fadeInAnimation: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  button: {
    backgroundColor: "#00796b",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginRight: "10px",
  },
  input: {
    padding: "8px",
    marginRight: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
};

// Append keyframes to document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerHTML = styles.fadeInAnimation;
document.head.appendChild(styleSheet);

// Navigation Bar Component
function NavigationBar({ currentTab, setCurrentTab }) {
  const tabs = [
    { key: "dashboard", label: "Dashboard" },
    { key: "expenses", label: "Expenses" },
    { key: "iot", label: "IoT Monitor" },
    { key: "analytics", label: "Analytics" },
    { key: "tips", label: "Green Tips" },
    { key: "profile", label: "Profile" },
  ];

  return (
    <div style={styles.navBar}>
      <div style={styles.navBarTitle}>EcoBudget App</div>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          style={{
            ...styles.navButton,
            ...(currentTab === tab.key ? styles.navButtonActive : {}),
          }}
          onClick={() => setCurrentTab(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// Dashboard Component: Overview summary
function Dashboard() {
  // Simulated data
  const totalExpenses = 1250.75;
  const monthlySavingsPotential = 150.50;
  const energyUsage = 320; // in kWh, simulated IoT reading

  return (
    <div>
      <h2>Dashboard</h2>
      <div style={styles.card}>
        <h3>Total Expenses (This Month)</h3>
        <p style={{ fontSize: "2rem", fontWeight: "bold" }}>${totalExpenses.toFixed(2)}</p>
      </div>
      <div style={styles.card}>
        <h3>Energy Consumption</h3>
        <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{energyUsage} kWh</p>
      </div>
      <div style={styles.card}>
        <h3>Potential Savings (Eco Tips Applied)</h3>
        <p style={{ fontSize: "2rem", fontWeight: "bold" }}>${monthlySavingsPotential.toFixed(2)}</p>
      </div>
    </div>
  );
}

// Expense Tracker Component: Add & list expenses
function ExpenseTracker() {
  const [expenses, setExpenses] = useState([
    { id: 1, description: "Groceries", amount: 75.20 },
    { id: 2, description: "Utilities", amount: 120.00 },
    { id: 3, description: "Transport", amount: 50.00 },
  ]);
  const [newExpense, setNewExpense] = useState({ description: "", amount: "" });

  const addExpense = () => {
    if (!newExpense.description || !newExpense.amount) return;
    setExpenses([
      ...expenses,
      { id: Date.now(), description: newExpense.description, amount: parseFloat(newExpense.amount) },
    ]);
    setNewExpense({ description: "", amount: "" });
  };

  return (
    <div>
      <h2>Expense Tracker</h2>
      <div style={styles.card}>
        <h3>Add Expense</h3>
        <input
          type="text"
          placeholder="Description"
          style={styles.input}
          value={newExpense.description}
          onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          style={styles.input}
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
        />
        <button style={styles.button} onClick={addExpense}>
          Add
        </button>
      </div>
      <div style={styles.card}>
        <h3>Expense List</h3>
        {expenses.map((exp) => (
          <div key={exp.id} style={{ marginBottom: "8px" }}>
            <strong>{exp.description}:</strong> ${exp.amount.toFixed(2)}
          </div>
        ))}
      </div>
    </div>
  );
}

// IoT Monitor Component: Simulated sensor readings for energy and water usage
function IoTMonitor() {
  const [energyUsage, setEnergyUsage] = useState(300); // kWh
  const [waterUsage, setWaterUsage] = useState(500); // Liters

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyUsage((prev) => Math.max(prev + Math.random() * 10 - 5, 0));
      setWaterUsage((prev) => Math.max(prev + Math.random() * 20 - 10, 0));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>IoT Monitor</h2>
      <div style={styles.card}>
        <h3>Energy Consumption</h3>
        <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{energyUsage.toFixed(0)} kWh</p>
      </div>
      <div style={styles.card}>
        <h3>Water Usage</h3>
        <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{waterUsage.toFixed(0)} L</p>
      </div>
    </div>
  );
}

// Analytics Component: Charts for expenses & IoT data
function Analytics() {
  const [timestamps, setTimestamps] = useState([]);
  const [expenseTrend, setExpenseTrend] = useState([]);
  const [energyTrend, setEnergyTrend] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamps((prev) => [...prev, new Date().toLocaleTimeString()].slice(-10));
      setExpenseTrend((prev) => [...prev, 100 + Math.random() * 50].slice(-10));
      setEnergyTrend((prev) => [...prev, 300 + Math.random() * 20].slice(-10));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: "Expense Trend ($)",
        data: expenseTrend,
        borderColor: "#00796b",
        backgroundColor: "#80cbc4",
        yAxisID: "y",
      },
      {
        label: "Energy Trend (kWh)",
        data: energyTrend,
        borderColor: "#ef5350",
        backgroundColor: "#ff8a80",
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: { mode: "index", intersect: false },
    plugins: { title: { display: true, text: "Analytics Overview", font: { size: 18 } } },
    scales: {
      y: { type: "linear", display: true, position: "left", min: 0, max: 200 },
      y1: { type: "linear", display: true, position: "right", min: 280, max: 350, grid: { drawOnChartArea: false } },
    },
  };

  return (
    <div>
      <h2>Analytics</h2>
      <div style={{ margin: "20px 0" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

// Green Tips Component: Static list of sustainability tips
function GreenTips() {
  const tips = [
    "Switch to LED bulbs to reduce energy consumption.",
    "Use smart plugs to monitor and cut off idle devices.",
    "Opt for public transport or carpooling to lower emissions.",
    "Reduce water waste by fixing leaks promptly.",
    "Plan meals to reduce food waste.",
    "Track your energy usage to identify savings.",
  ];
  return (
    <div>
      <h2>Green Tips</h2>
      <div style={styles.card}>
        {tips.map((tip, index) => (
          <p key={index} style={{ marginBottom: "10px", fontSize: "1.1rem" }}>
            • {tip}
          </p>
        ))}
      </div>
    </div>
  );
}

// Profile Component: User info (dummy authentication)
function Profile() {
  const dummyUser = {
    name: "Alex Eco",
    email: "alex.eco@example.com",
    joined: "January 2023",
  };
  return (
    <div>
      <h2>My Profile</h2>
      <div style={styles.card}>
        <p>
          <strong>Name:</strong> {dummyUser.name}
        </p>
        <p>
          <strong>Email:</strong> {dummyUser.email}
        </p>
        <p>
          <strong>Member Since:</strong> {dummyUser.joined}
        </p>
      </div>
    </div>
  );
}

// Main App Component with tab navigation
function App() {
  const [currentTab, setCurrentTab] = useState("dashboard");

  const renderTab = () => {
    switch (currentTab) {
      case "dashboard":
        return <Dashboard />;
      case "expenses":
        return <ExpenseTracker />;
      case "iot":
        return <IoTMonitor />;
      case "analytics":
        return <Analytics />;
      case "tips":
        return <GreenTips />;
      case "profile":
        return <Profile />;
      default:
        return <Dashboard />;
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
