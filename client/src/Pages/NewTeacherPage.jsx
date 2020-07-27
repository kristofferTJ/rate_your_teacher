import React, { Component } from 'react';
import Navbar from "../Components/Navbar";
import '../App.css';

class NewTeacherPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }

    render() {

        return (
            <div className="App">
                <Navbar />
                <div>New Teacher</div>
            </div>
        );
    }
}

export default NewTeacherPage;
