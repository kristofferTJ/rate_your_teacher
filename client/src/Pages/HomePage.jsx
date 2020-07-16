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
      courses: [],
      search: "",
      uni: "",
      course: "",
      isLoading: false
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

  setCourse = (cour) => {
    this.setState({ course: cour })
  }

  componentDidMount = async () => {

    this.setState({ isLoading: true })

    fetch("http://localhost:8000/api/courses/")
      .then(res => res.text())
      .then(res => this.setState({ courses: JSON.parse(res) }))
      .then(this.setState({ isLoading: false }))
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
            <div className="filter"><p>Filtrer på </p><DropdownButton className="dropdown" id="dropdown-basic-button-uni" title="Universitet">
              <Dropdown.Item className="dropdownItem" onClick={this.setUni.bind(this, "NTNU")} >NTNU</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" onClick={this.setUni.bind(this, "UIO")}>Universitetet i Oslo</Dropdown.Item>
            </DropdownButton> <p>og eller </p><DropdownButton className="dropdown" id="dropdown-basic-button-cource" title="Fag">
                {this.state.courses.map(course => (<Dropdown.Item className="dropdownItem" onClick={this.setCourse.bind(this, course.name)}>{course.name}</Dropdown.Item>))}
              </DropdownButton></div>
          </div>
          <Teachers search={this.state.search} uni={this.state.uni} course={this.state.course} />
        </div>
      </div>
    );
  }
}

export default HomePage;
