import React from 'react';
import logo from './logo.svg';
import Teachers from "./Components/Teachers";
import './App.css';

function App() {
  return (
    <div className="App">
      <div class="navbar">MENY</div>
      <div class="main">
        <p>
          Rate your teacher
        </p>

        <Teachers />
      </div>
    </div>
  );
}

export default App;
