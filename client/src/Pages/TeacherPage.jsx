import React, { Component } from 'react';
import Navbar from "../Components/Navbar";
import '../App.css';
import GradeCard from "../Components/GradeCard"

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
        console.log(teacher)
        return (
            <div className="App">
                <div className="teacherPage" >
                    <Navbar />
                    <GradeCard />
                </div >
            </div>
        )
    }
}
export default TeacherPage;

/*
<img alt="avatar" src={user.avatar}></img> 
<h1>{user.name}</h1>
*/