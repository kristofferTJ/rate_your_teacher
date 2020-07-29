import React, { Component } from 'react';
import Navbar from "../Components/Navbar";
import '../App.css';


class RequestPage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {

        return (

            <div className="App">
                <Navbar />
            </div>
        );
    }
}

export default RequestPage;