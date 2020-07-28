import React, { Component } from 'react';
import Navbar from "../Components/Navbar";
import '../App.css';
import GradeCard from "../Components/GradeCard"
import bilde from "../avatar.png"

class TeacherPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            teacher: '',
            user: '',
            isLoading: false
        }
    }

    componentDidMount = async () => {

        this.setState({ isLoading: true })


        fetch("http://localhost:8000/api/teacherprofile/profile/" + this.state.id)
            .then(res => res.text())
            .then(res => this.setState({ teacher: JSON.parse(res), user: JSON.parse(res).user }))
            .then(this.setState({ isLoading: false }))

        console.log(this.state.teacher)

    }

    render() {
        const teacher = this.state.teacher
        const user = this.state.user
        return (
            <div className="App">
                <Navbar />
                <div className="teacherPage" >
                    <img alt="avatar" src={bilde}></img>
                    <div className="teacherInformation">
                        <h1 >Jane Austen</h1>
                        <h4 >Underviser matematikk 1 ved NTNU</h4>
                    </div>
                    <button className="giVurdering">Gi vurdering</button>
                    <div className="menu">
                        <h3 className="item1">Karakterkort</h3>
                        <h3 className="item2">Annen undervisning</h3>
                        <h3 className="item3">Vurderinger</h3>
                    </div>
                <GradeCard/>
                </div>
            </div>
        )
    }
}
export default TeacherPage;

/*
<img alt="avatar" src={user.avatar}></img> 
<h1>{user.name}</h1>
*/