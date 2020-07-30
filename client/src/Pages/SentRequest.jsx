import React, { Component } from 'react';
import Navbar from "../Components/Navbar";
import '../App.css';


class RequestPage extends Component {
    constructor(props) {
        super(props)

    }


    render() {

        return (

            <div className="App">
                <Navbar />
                <h1>Ny foreleser</h1>
                <h2>Takk for din forespørsel!</h2>
            </div>
        );
    }
}

export default RequestPage;