import React, { Component } from 'react';
import Navbar from "../Components/Navbar";
import '../App.css';
import axios from 'axios'


class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            text: ''
        }
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeText = this.handleChangeText.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value })
    }

    handleChangeEmail(event) {
        this.setState({ email: event.target.value })
    }

    handleChangeText(event) {
        this.setState({ text: event.target.value })
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }
            const body = JSON.stringify(this.state)

            console.log("body" + body)


            const res = await axios.post('http://localhost:8000/api/contact/', body, config)
            //this.showValidationError('email', "User registered")
            console.log(res.data)
            this.props.history.push('/SentContact')

        } catch (err) {
            /*if (err.response.data.errors[0].msg === "User already exists ") {
                this.showValidationError('email', err.response.data.errors[0].msg)
            } else if (err.response.data.errors[0].msg === "Please enter a password with 6 or more characters")
                this.showValidationError('password', err.response.data.errors[0].msg)*/
        }
    }

    render() {

        return (
            <div className="App">
                <Navbar />
                <h1>Kontakt oss</h1>
                <h2>Skriv navnet ditt, mailen din og hva det gjelder så tar vi kontakt med deg</h2>
                <form className="newTeacher" onSubmit={this.handleSubmit}>
                    <label for="inputName">Navn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input id="inputName" type="text" onChange={this.handleChangeName} required></input></label>
                    <br></br>
                    <label for="inputEmail">Mail&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input required id="inputEmail" onChange={this.handleChangeEmail}>
                        </input></label>
                    <br></br>
                    <label for="inputText">Hva gjelder det?
                    <input id="inputText" type="textfield" onChange={this.handleChangeText}></input></label>
                    <br></br>
                    <input className="submitTeacher" type="submit" value="Send inn"></input>
                </form>

            </div>
        );
    }
}

export default Contact;
