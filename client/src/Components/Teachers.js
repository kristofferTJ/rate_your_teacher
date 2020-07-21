import React, { Component } from "react";
import { Link } from "react-router-dom";


class Teachers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teachers: [],
            isLoading: false,
            search: '',
            uni: '',
            course: ''
        }
    }

    componentDidMount = async () => {

        this.setState({ isLoading: true })

        fetch("http://localhost:8000/api/teacherprofile/")
            .then(res => res.text())
            .then(res => this.setState({ teachers: JSON.parse(res) }))
            .then(this.setState({ isLoading: false }))


    }

    static getDerivedStateFromProps(props, state) {
        return { search: props.search, uni: props.uni, course: props.course };
    }


    render() {


        return (
            < div title="Forelesere" className="teachers " >
                {
                    this.state.teachers.filter((teacher) => {
                        if (teacher.courses.filter((course) => {
                            if (course.name === this.state.course || this.state.course === "") {
                                return course
                            }
                        }).length > 0 || teacher.courses.length == 0) {
                            return teacher
                        }
                    }).filter(teacher => teacher.university.toLowerCase().includes(this.state.uni.toLowerCase())).filter(teacher => teacher.user.name.toLowerCase().includes(this.state.search.toLowerCase())).map(teacher => (
                        <Link className="link" to="/teacherPage">
                            <div className="teacher" key={teacher}>
                                <img alt="avatar" src={teacher.user.avatar}></img>
                                <div className="teacher_info"><h1>{teacher.user.name}</h1>
                                    {teacher.courses.map(course => <p>{course.name}, </p>)}
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
