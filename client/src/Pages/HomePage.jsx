import React, { Component } from 'react';
import Teachers from "../Components/Teachers";
import Navbar from "../Components/Navbar";
import '../App.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: "",
      uni: "",
      course: "",
    }
    this.updateSearch = this.updateSearch.bind(this)
  }


  updateSearch = (e) => {
    const newSearch = document.getElementById("input").value
    this.setState({ search: newSearch })
  }

  setUni = (university) => {
    this.setState({ uni: university })
  }

  render() {
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
            <div className="filter"><p>Filtrer på </p><DropdownButton className="dropdown" id="dropdown-basic-button" title="Universitet">
              <Dropdown.Item className="dropdownItem" onClick={this.setUni.bind(this, "NTNU")} >NTNU</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" onClick={this.setUni.bind(this, "UIO")}>Universitetet i Oslo</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" onClick={this.setUni.bind(this, "NTNU")} >NTNU</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" onClick={this.setUni.bind(this, "UIO")}>Universitetet i Oslo</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" onClick={this.setUni.bind(this, "NTNU")} >NTNU</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" onClick={this.setUni.bind(this, "UIO")}>Universitetet i Oslo</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" onClick={this.setUni.bind(this, "NTNU")} >NTNU</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" onClick={this.setUni.bind(this, "UIO")}>Universitetet i Oslo</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" onClick={this.setUni.bind(this, "NTNU")} >NTNU</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" onClick={this.setUni.bind(this, "UIO")}>Universitetet i Oslo</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" onClick={this.setUni.bind(this, "NTNU")} >NTNU</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" onClick={this.setUni.bind(this, "UIO")}>Universitetet i Oslo</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" onClick={this.setUni.bind(this, "NTNU")} >NTNU</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" onClick={this.setUni.bind(this, "UIO")}>Universitetet i Oslo</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" onClick={this.setUni.bind(this, "NTNU")} >NTNU</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" onClick={this.setUni.bind(this, "UIO")}>Universitetet i Oslo</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" onClick={this.setUni.bind(this, "NTNU")} >NTNU</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" onClick={this.setUni.bind(this, "UIO")}>Universitetet i Oslo</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" onClick={this.setUni.bind(this, "NTNU")} >NTNU</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" onClick={this.setUni.bind(this, "UIO")}>Universitetet i Oslo</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" onClick={this.setUni.bind(this, "NTNU")} >NTNU</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" onClick={this.setUni.bind(this, "UIO")}>Universitetet i Oslo</Dropdown.Item>

            </DropdownButton> <p>og eller <a href="nrk.no">fag</a></p></div>
          </div>
          <Teachers search={this.state.search} uni={this.state.uni} course="" />
        </div>
      </div>
    );
  }
}

export default HomePage;
