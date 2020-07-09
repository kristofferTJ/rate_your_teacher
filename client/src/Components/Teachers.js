import React, { Component } from "react";
import avatar from '../avatar.png'
import { Link } from "react-router-dom";
import c from "config";

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

        /*await apis.getAllTeachers().then(teachers => {
            this.setState({
                teachers: teachers.profiles,
                isLoading: false
            })
        })*/
        fetch("http://localhost:8000/api/teacherprofile/teachers")
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
        const teachers = this.state
        console.log(teachers)
        return (
            //<p>Testing</p>
            <div title="Forelesere" className="teachers ">
                {this.state.teachers.map(teacher => (
                    <Link className="link" to="/teacherPage">
                        <div className="teacher" key={teacher}>
                            <img alt="avatar" src={teacher.user.avatar}></img>
                            <div className="teacher_info"><h1>{teacher.user.name}</h1>
                                {teacher.courses.map(course => this.state.courses.filter(c => course._id == c._id).map(<p key={course}>{c.name}</p>))}
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
/*
const Teachers = () => {
    //teachers: []
    const teachers = [
        {
            name: "Per",
            grade: "A",
            avatar: "sf",
            university: "NTNU",
            courses: [
                { course: "Matte" },
                { course: "Exphil" }

            ]
        },
        {
            name: "Arne",
            grade: "C",
            avatar: "sf",
            university: "NTNU",
            courses: [

                { course: "Matte" },
                { course: "Exphil" }

            ]
        },
        {
            name: "Kari",
            grade: "B",
            avatar: "sf",
            university: "NTNU",
            courses: [

                { course: "Matte" },
                { course: "Exphil" }

            ]
        },
        {
            name: "Kåre",
            grade: "D",
            avatar: "sf",
            university: "NTNU",
            courses: [

                { course: "Matte" },
                { course: "Exphil" }

            ]
        },
        {
            name: "Bob",
            grade: "E",
            avatar: "sf",
            university: "NTNU",
            courses: [

                { course: "Matte" },
                { course: "Exphil" }

            ]
        },
        {
            name: "Kjersti",
            grade: "A",
            avatar: "sf",
            university: "NTNU",
            courses: [

                { course: "Matte" },
                { course: "Exphil" }

            ]
        }
    ];
    return (
        <div title="Forelesere" className="teachers ">
            {teachers.map(teacher => (
                <Link className="link" to="/TeacherPage">
                    <div className="teacher" key={teacher}>
                        <img alt="avatar" src={avatar}></img>
                        <div className="teacher_info"><h1>{teacher.name}</h1>
                            <p>{teacher.courses.map(cours => (<p key={cours}>{cours.course}</p>))} ved {teacher.university}</p></div>
                        <p className="teacher_total_grade">{teacher.grade}</p>
                        <div className="teacher_grades"><p>Karakter <br></br> karakter <br></br> karakter</p></div>
                    </div>
                </Link>
            ))
            }
        </div >
    );
};*/

export default Teachers;
