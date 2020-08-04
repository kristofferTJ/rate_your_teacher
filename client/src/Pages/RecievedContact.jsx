import React, { Component } from 'react';
import Navbar from "../Components/Navbar";
import '../App.css';
import axios from 'axios'



class RecievedContact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contacts: [],
            isLoading: false
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount = async () => {

        this.setState({ isLoading: true })

        fetch("http://localhost:8000/api/contact/")
            .then(res => res.text())
            .then(res => this.setState({ contacts: JSON.parse(res) }))
            .then(this.setState({ isLoading: false }))


    }

    async handleDelete(req) {
        try {


            const id = req._id;
            console.log(id);

            await axios.delete('http://localhost:8000/api/contact/' + id);
            //this.showValidationError('email', "User registered")
            console.log("her")

            this.componentDidMount()
            this.forceUpdate()
        } catch (err) {
            console.log("erroor")
            if
                (err.response.data.errors[0].msg === "User already exists ") {
                this.showValidationError('email', err.response.data.errors[0].msg)
            } else if (err.response.data.errors[0].msg === "Please enter a password with 6 or more characters")
                this.showValidationError('password', err.response.data.errors[0].msg)
        }
    }


    render() {

        return (

            <div className="App">
                <Navbar />
                <h1>Kontakt</h1>
                <div className="requests">
                    <table>
                        <tr>
                            <th>Navn</th>
                            <th>Universitet</th>
                            <th>Fag</th>
                            <th></th>
                        </tr>
                        {this.state.contacts.map(contact => (<tr className="request"><td>{contact.name}</td> <td>{contact.email}</td> <td>{contact.text}</td><td><a href={"mailto:" + contact.email}><button>Send mail</button></a><button onClick={() => this.handleDelete(contact)}>Delete</button></td></tr>))}
                    </table>
                </div>
            </div>
        );
    }
}

export default RecievedContact;
