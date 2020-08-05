import React, { Component } from 'react';
import Navbar from "../Components/Navbar";
import '../App.css';
import GradeCard from "../Components/GradeCard"
import Ratings from "../Components/Ratings"
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sidebar from "../Components/Sidebar"


class TeacherPage extends Component {
    constructor(props) {

        super(props)
        this.state = {
            id: this.props.location.state.id,
            teacher: '',
            courses: [],
            user: '',
            isLoading: false
        }
    }

    componentDidMount = async () => {

        this.setState({ isLoading: true })
        console.log(this.state.id)

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

    gradeAverage = (co, skill) => {
        var grades = 0
        var gradeCount = 0
        var avg = 0

        if (co.length > 0) {
            if (skill === "total") {
                { co.map(course => course.ratings.map(rating => grades += (rating.knowledge + rating.communication + rating.assistance), gradeCount += 3)) }
            } else {
                co.forEach((course) => course.ratings.forEach((rating) => grades += rating[skill], gradeCount += 1))
            }

            avg = grades / gradeCount

            return avg
        } else {
            return 0
        }
    }

    render() {
        const { teacher, user, courses } = this.state

        return (
            <div className="App">
                <Navbar />
                <div className="teacherPage" >
                    <div className="sidebar">
                        <img alt="avatar" src={user.avatar}></img>
                        <Sidebar/>
                    </div>
                    <div className="body">
                        <div className="teacherHeader">
                            <div className="teacherInformation">
                                <h2 >{user.name}</h2>
                                <h5 >Underviser {this.displayCourses(courses)} ved {teacher.university}</h5>
                            </div>
                            {courses.length > 0 ? <Link className="giVurderingLink" to={{ pathname: '/NewReview', state: { id: this.state.teacher._id } }}><button className="giVurdering">Gi vurdering</button></Link> : <p></p>}
                        </div>
                        <div className="content">
                            <GradeCard courses={courses} id="section1" />
                            <Ratings id="section3" gradeAverage={this.gradeAverage} courses={courses} name={user.name} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(TeacherPage)
