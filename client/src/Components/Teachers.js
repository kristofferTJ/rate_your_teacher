import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grade from './Grade'


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
        this.totalAverage = this.totalAverage.bind(this)
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

    totalAverage = (teacher) => {

        var grades = 0
        var gradeCount = 0
        var avg = 0

        { teacher.courses.map(course => course.ratings.map(rating => grades += (rating.knowledge + rating.communication + rating.assistance), gradeCount += 3)) }

        avg = grades / gradeCount

        if (avg) {

            return avg
        }
        else {
            return "Ikke registrert"
        }

    }

    communicationAverage = (teacher) => {

        var grades = 0
        var gradeCount = 0
        var avg = 0

        { teacher.courses.map(course => course.ratings.map(rating => grades += rating.communication, gradeCount += 1)) }

        avg = grades / gradeCount

        if (avg) {
            return avg
        }
        else {
            return ""
        }
    }

    knowledgeAverage = (teacher) => {

        var grades = 0
        var gradeCount = 0
        var avg = 0

        { teacher.courses.map(course => course.ratings.map(rating => grades += rating.knowledge, gradeCount += 1)) }

        avg = grades / gradeCount

        if (avg) {
            return avg
        }
        else {
            return ""
        }
    }

    assistanceAverage = (teacher) => {

        var grades = 0
        var gradeCount = 0
        var avg = 0

        { teacher.courses.map(course => course.ratings.map(rating => grades += rating.assistance, gradeCount += 1)) }

        avg = grades / gradeCount

        if (avg) {
            return avg
        }
        else {
            return ""
        }
    }


    render() {


        return (


            <div>
                {
                    (this.state.teachers.filter((teacher) => {
                        if (teacher.courses.filter((course) => {
                            if (course.coursecode === this.state.course || this.state.course === "") {
                                return course
                            }
                        }).length > 0 || teacher.courses.length == 0) {
                            return teacher
                        }
                    }).filter(teacher => teacher.university.toLowerCase().includes(this.state.uni.toLowerCase())).filter(teacher => teacher.user.name.toLowerCase().includes(this.state.search.toLowerCase())).length <= 0) ? (<div className="noResult"><p>Søket ga ingen resultater</p>
                        <Link to="/NewTeacher"><button>Legg til foreleser</button></Link></div>) :

                        (< div title="Forelesere" className="teachers " >
                            {
                                this.state.teachers.filter((teacher) => {
                                    if (teacher.courses.filter((course) => {
                                        if (course.coursecode === this.state.course || this.state.course === "") {
                                            return course
                                        }
                                    }).length > 0 || teacher.courses.length == 0) {
                                        return teacher
                                    }
                                }).filter(teacher => teacher.university.toLowerCase().includes(this.state.uni.toLowerCase())).filter(teacher => teacher.user.name.toLowerCase().includes(this.state.search.toLowerCase())).map(teacher => (
                                    <Link className="link" to={`/teacherPage/${teacher._id}`}>
                                        <div className="teacher" key={teacher}>
                                            <img alt="avatar" src={teacher.user.avatar}></img>
                                            <div className="teacher_info"><h1>{teacher.user.name}</h1>
                                                {teacher.courses.map(course => <p>{course.name}, </p>)}
                                ved {teacher.university}</div>
                                            <p className="teacher_total_grade">Total karakter <br></br><br></br><Grade grade={this.totalAverage(teacher)}></Grade></p>
                                            <div className="teacher_grades"><p> <Grade grade={this.knowledgeAverage(teacher)}></Grade>Kunnskap</p><p> <Grade grade={this.communicationAverage(teacher)}></Grade>Kommunikasjon</p><p> <Grade grade={this.assistanceAverage(teacher)}></Grade>Hjelpsomhet</p></div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div >)
                }</div>
        );
    }
}


export default Teachers;
