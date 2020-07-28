import React, { Component } from 'react';
import Navbar from "../Components/Navbar";
import '../App.css';
import axios from 'axios'


class NewTeacherPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            uni: '',
            course: ''
        }
        this.handleChangeCourse = this.handleChangeCourse.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeUni = this.handleChangeUni.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value })
        console.log("name")
    }

    handleChangeUni(event) {
        this.setState({ uni: event.target.value })
        console.log("uni")
    }

    handleChangeCourse(event) {
        this.setState({ course: event.target.value })
        console.log("course")
    }

    async handleSubmit(event) {
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }
            const body = JSON.stringify(this.state)

            console.log("body" + body)


            const res = await axios.post('http://localhost:8000/api/requests/', body, config)
            //this.showValidationError('email', "User registered")
            console.log(res.data)
        } catch (err) {
            if (err.response.data.errors[0].msg === "User already exists ") {
                this.showValidationError('email', err.response.data.errors[0].msg)
            } else if (err.response.data.errors[0].msg === "Please enter a password with 6 or more characters")
                this.showValidationError('password', err.response.data.errors[0].msg)
        }
    }

    render() {

        return (
            <div className="App">
                <Navbar />
                <h1>Ny foreleser</h1>
                <h2>Skriv inn informasjon om foreleseren så skal vi vurdere forespørselen</h2>
                <form onSubmit={this.handleSubmit}>
                    <label for="inputName">Navn
                    <input id="inputName" type="text" onChange={this.handleChangeName} required></input></label>
                    <label for="inputUni">Skole
                    <input required id="inputUni" onChange={this.handleChangeUni}>
                        </input></label>
                    <label for="inputCourse">Tilhørende fag
                    <input id="inputCourse" type="text" onChange={this.handleChangeCourse}></input></label>
                    <input type="submit" value="Send inn"></input>
                </form>
                <div>
                    <p>{this.state.name} + {this.state.uni} + {this.state.course}</p>
                </div>
            </div>
        );
    }
}

export default NewTeacherPage;
