import React, { Component } from 'react';
import Navbar from "../Components/Navbar";
import '../App.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios'



class NewReview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.userId,
            teacher: '',
            courses: [],
            course: '',
            user: '',
            assistance: '',
            communication: '',
            knowledge: '',
            isLoading: false
        }
        this.setCourse = this.setCourse.bind(this)
        this.handleChangeAssistance = this.handleChangeAssistance.bind(this)
        this.handleChangeCommunication = this.handleChangeCommunication.bind(this)
        this.handleChangeKnowledge = this.handleChangeKnowledge.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    setCourse = (course) => {
        this.setState({ course: course })
    }

    handleChangeAssistance(event) {
        this.setState({ assistance: event.target.value })
    }
    handleChangeCommunication(event) {
        this.setState({ communication: event.target.value })
    }
    handleChangeKnowledge(event) {
        this.setState({ knowledge: event.target.value })
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

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }


            const body = JSON.stringify({ communication: this.state.communication, knowledge: this.state.knowledge, assistance: this.state.assistance })

            console.log("body" + body)

            console.log("absolutt")
            const res = await axios.put('http://localhost:8000/api/studentprofile/' + this.state.teacher._id + '/' + this.state.course, body, config)
            //this.showValidationError('email', "User registered")
            console.log("utpå")
            console.log(res.data)
            //this.props.history.push('/SentRequest')

        } catch (err) {
            /*if (err.response.data.errors[0].msg === "User already exists ") {
                this.showValidationError('email', err.response.data.errors[0].msg)
            } else if (err.response.data.errors[0].msg === "Please enter a password with 6 or more characters")
                this.showValidationError('password', err.response.data.errors[0].msg)*/
        }
    }

    render() {

        const setTextCourse = () => {
            if (this.state.course === "") {
                textCourse = "Fag"
            } else {
                textCourse = this.state.course
            }
        }
        var textCourse = ""
        setTextCourse();

        console.log(this.state.course)


        return (
            <div className="App" >
                <Navbar />
                <h1>Ny vurdering av {this.state.teacher.user?.name}</h1>
                <form className="newReview" onSubmit={this.handleSubmit}>
                    <label for="inputCourse">Fag
                    <DropdownButton className="dropdown" id="dropdownNewReview" title={textCourse}>

                            {this.state.courses.map(course => (<Dropdown.Item className="dropdownItem" onClick={this.setCourse.bind(this, course._id)}>{course.coursecode} {course.name}</Dropdown.Item>))}
                        </DropdownButton> </label>
                    <br></br>
                    <label for="inputKnowledge">Kunnskap
                    <input required id="inputKnowledge" onChange={this.handleChangeKnowledge} type="number" max="5" min="0">
                        </input></label>
                    <br></br>
                    <label for="inputCommunication">Kommunikasjon
                    <input required id="inputCommunication" onChange={this.handleChangeCommunication} type="number" max="5" min="0">
                        </input></label>
                    <br></br>
                    <label for="inputAssistance">Hjelpsomhet
                    <input required id="inputAssistance" onChange={this.handleChangeAssistance} type="number" max="5" min="0">
                        </input></label>
                    <br></br>
                    <input className="submitTeacher" type="submit" value="Send inn"></input>
                </form>

            </div >
        );
    }
}

export default NewReview;