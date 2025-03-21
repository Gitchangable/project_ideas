import React, { useState } from "react";

const styles = {
  appContainer: {
    fontFamily: "'Roboto', sans-serif",
    background: "linear-gradient(to bottom right, #fceabb, #f8b500)",
    minHeight: "100vh",
    padding: "20px",
  },
  navBar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  navBarTitle: {
    fontSize: "1.6rem",
    fontWeight: "bold",
  },
  contentContainer: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
    marginBottom: "20px",
  },
  spot: {
    height: "80px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: "#fff",
    cursor: "pointer",
  },
  btn: {
    backgroundColor: "#444",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
    transition: "background-color 0.3s",
  },
  btnActive: {
    backgroundColor: "#888",
  },
};

// Define the possible states for a parking spot
const STATE = {
  FREE: "free",
  RESERVED: "reserved",
  TAKEN: "taken",
};

// Map states to colors
const stateColors = {
  [STATE.FREE]: "#28a745",    // green
  [STATE.RESERVED]: "#ffc107", // yellow
  [STATE.TAKEN]: "#dc3545",    // red
};

// A minimal ParkingLot component
function ParkingLot() {
  // Create an array of 16 spots with initial state FREE
  const initialSpots = Array.from({ length: 16 }, (_, index) => ({
    id: index,
    state: STATE.FREE,
  }));
  const [spots, setSpots] = useState(initialSpots);

  // Toggle reservation on click (minimal interaction)
  const toggleReservation = (id) => {
    setSpots((prev) =>
      prev.map((spot) =>
        spot.id === id
          ? { ...spot, state: spot.state === STATE.FREE ? STATE.RESERVED : STATE.FREE }
          : spot
      )
    );
  };

  // A minimal reset function
  const resetSpots = () => setSpots(initialSpots);

  return (
    <div>
      <h2>Parking Lot Availability</h2>
      <div style={styles.grid}>
        {spots.map((spot) => (
          <div
            key={spot.id}
            style={{
              ...styles.spot,
              backgroundColor: stateColors[spot.state],
            }}
            onClick={() => toggleReservation(spot.id)}
          >
            {spot.state.toUpperCase()}
          </div>
        ))}
      </div>
      <div>
        <button style={styles.btn} onClick={resetSpots}>
          Reset
        </button>
      </div>
    </div>
  );
}

// A very minimal NavigationBar (only one tab for simplicity)
function NavigationBar() {
  return (
    <div style={styles.navBar}>
      <div style={styles.navBarTitle}>Parking Lot Demo</div>
    </div>
  );
}

// The main App component for the parking demo
function App() {
  return (
    <div style={styles.appContainer}>
      <NavigationBar />
      <div style={styles.contentContainer}>
        <ParkingLot />
      </div>
    </div>
  );
}

export default App;
