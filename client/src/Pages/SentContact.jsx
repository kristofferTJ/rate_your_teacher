import React, { Component } from 'react';
import Navbar from "../Components/Navbar";
import '../App.css';


class SentContact extends Component {
    constructor(props) {
        super(props)

    }


    render() {

        return (

            <div className="App">
                <Navbar />
                <h1>Takk for at du tok kontakt!</h1>
            </div>
        );
    }
}

export default SentContact;