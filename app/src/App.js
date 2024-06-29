import { useState, useEffect } from "react";
import io from "socket.io-client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const socketConnection = io("http://127.0.0.1:5000");
    socketConnection.on("chart-change", (data) => {
      setData(data);
    });
  }, []);

  return (
    <div className="App">
      <LineChart width={1000} height={500} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
        <Line type="monotone" dataKey="amt" stroke="#454345" />
      </LineChart>
    </div>
  );
}

export default App;
