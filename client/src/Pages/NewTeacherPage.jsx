import React, { Component } from 'react';
import Navbar from "../Components/Navbar";
import '../App.css';

class NewTeacherPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            uni: '',
            course: '',
            image: ''
        }
        this.handleChangeCourse = this.handleChangeCourse.bind(this)
        this.handleChangeImage = this.handleChangeImage.bind(this)
        this.handleChangeMail = this.handleChangeMail.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeUni = this.handleChangeUni.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value })
    }

    handleChangeMail(event) {
        this.setState({ email: event.target.value })
    }

    handleChangeUni(event) {
        this.setState({ uni: event.target.value })
    }

    handleChangeCourse(event) {
        this.setState({ course: event.target.value })
    }

    handleChangeImage(event) {
        this.setState({ image: event.target.value })
    }

    handleSubmit(event) {
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }
            const body = JSON.stringify(this.state.name + this.state.mail)

            console.log("body" + body)
            /*
            const res = await axios.post('http://localhost:8000/api/users', body, config)
            this.showValidationError('email', "User registered")
            //  console.log(res.data)*/
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
                <h1>Legg til ny foreleser</h1>
                <h2>Vær så snill og dobbeltsjekk at foreleseren ikke allerede eksisterer i søkevinduet over.</h2>
                <form onSubmit={this.handleSubmit}>
                    <label for="inputName">Navn
                    <input id="inputName" type="text" onChange={this.handleChangeName} required></input></label>
                    <label for="inputMail">Mail
                    <input id="inputMail" type="email" onChange={this.handleChangeMail}></input></label>
                    <label for="inputUni">Skole
                    <select required id="inputUni" name="Velg universitet" onChange={this.handleChangeUni}>
                            <option value="">Velg et universitet</option>
                            <option value="NTNU">NTNU</option>
                            <option value="UIO">Universitetet i Oslo</option>
                        </select></label>
                    <label for="inputCourse">Tilhørende fag
                    <input id="inputCourse" type="text" onChange={this.handleChangeCourse}></input></label>
                    <label for="inputAvatar">Last opp bilde
                    <input id="inputAvatar" type="image" onChange={this.handleChangeImage}></input></label>
                    <input type="submit" value="skdjfhjdshf"></input>
                </form>
            </div>
        );
    }
}

export default NewTeacherPage;
