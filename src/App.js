import React, { useState } from "react";
import QrReader from "react-qr-reader";

function App() {
  const [result, setResult] = useState("");

  const handleScan = data => {
    if (data) {
      setResult(data);
    }
  };
  const handleError = err => {
    console.log(err);
  };
  return (
    <div className="App">
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <p>PAPA-{result}-PAPA</p>
    </div>
  );
}

export default App;
