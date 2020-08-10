import React, { Component } from 'react';
import Navbar from "../Components/Navbar";
import '../App.css';


class OmOss extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {

        return (

            <div className="App">
                <Navbar />
                <h1>Om oss</h1>
            </div>
        );
    }
}

export default OmOss