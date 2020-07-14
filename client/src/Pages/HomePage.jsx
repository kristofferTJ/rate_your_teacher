import React, { Component } from 'react';
import Teachers from "../Components/Teachers";
import Navbar from "../Components/Navbar";
import '../App.css';

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: ""
    }
    this.updateSearch = this.updateSearch.bind(this)
  }

  updateSearch(e) {
    console.log("gtyhh")
    const newSearch = document.getElementById("input").value
    this.setState({ search: newSearch })
  }

  render() {
    console.log("gei")
    console.log("state" + this.state.search)
    return (
      <div className="App">
        <div className="main">
          <Navbar />
          <div className="minForeleser"><h1>Min foreleser</h1>
            <h2>Finn din foreleser, gi en vurdering eller se hvilke karakterer hun eller han har!</h2>
            <div className="search" >
              <input type="text" className="searchbar" id="input" placeholder="Søk etter foreleseren etter navn"></input>
              <button type="submit" value="" onClick={this.updateSearch} className="searchButton"></button>
            </div>
            <p>Filtrer på <a href="nrk.no">universitet</a> og eller <a href="nrk.no">fag</a></p>
          </div>
          <Teachers search={this.state.search} />
        </div>
      </div>
    );
  }
}

export default HomePage;
