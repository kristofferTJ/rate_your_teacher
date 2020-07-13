import React from 'react';
import Teachers from "../Components/Teachers";
import Navbar from "../Components/Navbar";
import '../App.css';

function HomePage() {
  return (
    <div className="App">
      <div className="main">
        <Navbar />
        <div className="minForeleser"><h1>Min foreleser</h1>
          <h2>Finn din foreleser, gi en vurdering eller se hvilke karakterer hun eller han har!</h2>
          <form className="search" action="" method="get">
            <input type="text" className="searchbar" placeholder="Søk etter foreleseren etter navn"></input>
            <input type="submit" value="" className="searchButton"></input>
          </form>
          <p>Filtrer på <a href="nrk.no">universitet</a> og eller <a href="nrk.no">fag</a></p>
        </div>
        <Teachers search="john" />
      </div>
    </div>
  );
}

export default HomePage;
