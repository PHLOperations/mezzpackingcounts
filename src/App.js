import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const fetchData = async () => {
  try {
    const response = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vSs1te3K2GDZFmvXnV2dj_uLzlZpLQsLehdsGgDIVT2jYBQaebYQ-xxTL_cT3sot9TrU31cHWM8Xhz1/pub?gid=0&single=true&output=csv");
    const text = await response.text();
    const rows = text.trim().split("\n").map((line) => line.split(","));
    const lastUpdated = new Date().toLocaleTimeString();

    setData(rows.slice(1)); // skip header
    setLastUpdated(lastUpdated);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <h1>📦 Packing Dashboard</h1>
      <p className="updated">Last updated at: {lastUpdated}</p>
      <table>
        <thead>
          <tr>
            <th>Hour</th>
            <th>Adam</th>
            <th>Andrea</th>
            <th>Ella</th>
            <th>Gabriela</th>
            <th>Kate</th>
            <th>Gabe</th>
            <th>Shell</th>
            <th>Susan</th>
            <th>Kelly</th>
            <th>Sam</th>
            <th>Isaac</th>
            <th>Ruby</th>
            <th>Team Total</th>
            <th>Orders Remaining</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {row.map((cell, cIdx) => (
                <td key={cIdx}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
