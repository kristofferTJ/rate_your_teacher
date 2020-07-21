import React, { Component } from 'react';
import Navbar from "../Components/Navbar";
import '../App.css';


class RequestPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requests: [],
            isLoading: false
        }
    }

    componentDidMount = async () => {

        this.setState({ isLoading: true })

        fetch("http://localhost:8000/api/request/")
            .then(res => res.text())
            .then(res => this.setState({ requests: JSON.parse(res) }))
            .then(this.setState({ isLoading: false }))


    }

    render() {
        console.log(this.state.requests)

        return (

            <div className="App">
                <Navbar />
            </div>
        );
    }
}

export default RequestPage;
