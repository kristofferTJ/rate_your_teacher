import React from 'react';
import logo from './logo.svg';
import Teachers from "./Components/Teachers";
import Navbar from "./Components/Navbar";
import './App.css';

function App() {
  return (
    <div className="App">
      <div class="main">
        <Navbar />
        <h1>Min foreleser</h1>
        <h2>Finn din foreleser, gi en vurdering eller se hvilke karakterer hun eller han har!</h2>
        <div class="search">
          <input type="text" class="searchbar"></input>
        </div>

        <Teachers />
      </div>
    </div>
  );
}

export default App;
