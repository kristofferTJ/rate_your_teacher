import React from 'react';
import Teachers from "../Components/Teachers";
import Navbar from "../Components/Navbar";
import '../App.css';

function HomePage() {
  return (
    <div className="App">
      <div className="main">
        <Navbar />
        <h1>Min foreleser</h1>
        <h2>Finn din foreleser, gi en vurdering eller se hvilke karakterer hun eller han har!</h2>
        <div className="search">
          <input type="text" className="searchbar"></input>
        </div>

        <Teachers />
      </div>
    </div>
  );
}

export default HomePage;
