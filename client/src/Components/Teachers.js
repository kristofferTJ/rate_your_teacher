import React, { Component } from "react";
import avatar from '../avatar.png'
import { Link } from "react-router-dom";
//import c from "config";

//import apis from "../api";

class Teachers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teachers: [],
            courses: [],
            isLoading: false
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        fetch("http://localhost:8000/api/teacherprofile/")
            .then(res => res.text())
            .then(res => this.setState({ teachers: JSON.parse(res) }))
            .then(this.setState({ isLoading: false }))

        this.setState({ isLoading: true })

        fetch("http://localhost:8000/api/courses/")
            .then(res => res.text())
            .then(res => this.setState({ courses: JSON.parse(res) }))
            .then(this.setState({ isLoading: false }))
    }

    render() {
        /*const teachers = this.state
        const courses = this.state
        console.log(teachers)
        console.log(courses)*/
        return (
            //<p>Testing</p>
            <div title="Forelesere" className="teachers ">
                {this.state.teachers.filter(teacher => teacher.user.name.toLowerCase().includes(this.props.search.toLowerCase())).map(teacher => (
                    <Link className="link" to="/teacherPage">
                        <div className="teacher" key={teacher}>
                            <img alt="avatar" src={teacher.user.avatar}></img>
                            <div className="teacher_info"><h1>{teacher.user.name}</h1>
                                {teacher.courses.map(course => <p>{course.name}</p>)}
                                ved {teacher.university}</div>
                            <p className="teacher_total_grade">{teacher.grade}</p>
                        </div>
                    </Link>
                ))
                }
            </div >
        );
    }
}


export default Teachers;
