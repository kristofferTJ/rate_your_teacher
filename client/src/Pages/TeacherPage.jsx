import React, { Component } from 'react';
import Navbar from "../Components/Navbar";
import '../App.css';
import GradeCard from "../Components/GradeCard"
import Ratings from "../Components/Ratings"
import { Link } from "react-router-dom";


class TeacherPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.userId,
            teacher: '',
            courses: [],
            user: '',
            isLoading: false
        }
    }

    componentDidMount = async () => {

        this.setState({ isLoading: true })

        fetch("http://localhost:8000/api/teacherprofile/profile/" + this.state.id)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    teacher: res,
                    courses: res.courses,
                    user: res.user,
                    isLoading: false
                })
            })

    }

    displayCourses = (courses) => {
        let displayCourses = ""

        if (courses.length < 1) {
            displayCourses = "ingen fag"
        } else if (courses.length === 1) {
            displayCourses = courses[0].name
        } else {
            courses.forEach(element => {
                displayCourses += element.name + ", "
            });
        }
        return displayCourses
    }

    render() {
        const { teacher, user, courses } = this.state

        return (
            <div className="App">
                <Navbar />
                <div className="teacherPage" >
                    <img alt="avatar" src={user.avatar}></img>
                    <div className="teacherInformation">
                        <h2 >{user.name}</h2>
                        <h5 >Underviser {this.displayCourses(courses)} ved {teacher.university}</h5>
                    </div>
                    {courses.length > 0 ? <Link className="giVurderingLink" to={`/NewReview/${this.state.teacher._id}`}><button className="giVurdering">Gi vurdering</button></Link> : <p></p>}

                    <div className="menu">
                        <h3 className="item1">Karakterkort</h3>
                        <h3 className="item2">Annen undervisning</h3>
                        <h3 className="item3">Vurderinger</h3>
                    </div>
                    <GradeCard courses={courses} />
                    <Ratings />
                </div>
            </div>
        )
    }
}


export default TeacherPage;
