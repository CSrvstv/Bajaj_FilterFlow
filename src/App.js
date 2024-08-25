import React, { useState } from "react";
import style from './App.css';

function App() {
  const [apiInput, setApiInput] = useState("");
  const [filteredResponse, setFilteredResponse] = useState("");
  const [filterOptions, setFilterOptions] = useState([]);

  const handleSubmit = () => {
    try {
      const data = JSON.parse(apiInput);
      const filteredData = data.data.filter((item) => typeof item === "number");
      setFilteredResponse(`Numbers: ${filteredData.join(", ")}`);
      setFilterOptions(filteredData);
    } catch (error) {
      setFilteredResponse("Invalid JSON input");
    }
  };
  
  const handleFilterChange = (event) => {
    const { checked } = event.target;
    const value = event.target.value;

    if (checked) {
      setFilterOptions([...filterOptions, value]);
    } else {
      setFilterOptions(filterOptions.filter((item) => item !== value));
    }
  };

  return (
    <div className="container">
      <h2>API Input</h2>
      <textarea
        className="input"
        value={apiInput}
        onChange={(e) => setApiInput(e.target.value)}
      />
      <button className="submit" onClick={handleSubmit}>
        Submit
      </button>

      <h2>Multi Filter</h2>
      <div className="fcontainer">
        {filterOptions.map((option, index) => (
          <label key={index} className="foption">
            <input
              type="checkbox"
              value={option}
              checked={filterOptions.includes(option)}
              onChange={handleFilterChange}
            />
            {option}
          </label>
        ))}
      </div>

      <h2>Filtered Response</h2>
      <p className="response">{filteredResponse}</p>
    </div>
  );
}

export default App;
