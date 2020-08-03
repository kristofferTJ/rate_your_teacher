import React, { Component } from 'react';
import Navbar from "../Components/Navbar";
import '../App.css';


class SentReview extends Component {
    constructor(props) {
        super(props)

    }


    render() {

        return (

            <div className="App">
                <Navbar />
                <h1>Takk for din vurdering!</h1>
            </div>
        );
    }
}

export default SentReview;