import React, { Component } from 'react';
import Navbar from "../Components/Navbar";
import '../App.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios'
import ReactStars from 'react-rating-stars-component'



class NewReview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.userId,
            teacher: '',
            courses: [],
            course: {
                id: '',
                code: ''
            },
            user: '',
            assistance: '',
            communication: '',
            knowledge: '',
            isLoading: false
        }
        this.setCourse = this.setCourse.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.ratingChangedKnowledge = this.ratingChangedKnowledge.bind(this)
        this.ratingChangedAssistance = this.ratingChangedAssistance.bind(this)
        this.ratingChangedCommunication = this.ratingChangedCommunication.bind(this)
    }

    setCourse = (course) => {
        this.setState({
            course: {
                id: course._id,
                code: course.coursecode
            }
        })
    }

    ratingChangedAssistance(newRating) {
        this.setState({ assistance: newRating })
    }
    ratingChangedCommunication(newRating) {
        this.setState({ communication: newRating })
    }
    ratingChangedKnowledge(newRating) {
        this.setState({ knowledge: newRating })
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
            const res = await axios.put('http://localhost:8000/api/studentprofile/' + this.state.teacher._id + '/' + this.state.course.id, body, config)
            //this.showValidationError('email', "User registered")
            console.log("utpå")
            //console.log(res.data)
            console.log("skjdfdsjhf")
            this.props.history.push('/SentReview')

        } catch (err) {
            /*if (err.response.data.errors[0].msg === "User already exists ") {
                this.showValidationError('email', err.response.data.errors[0].msg)
            } else if (err.response.data.errors[0].msg === "Please enter a password with 6 or more characters")
                this.showValidationError('password', err.response.data.errors[0].msg)*/
        }
    }

    render() {

        const setTextCourse = () => {
            if (this.state.course.id === "") {
                textCourse = "Fag"
            } else {
                textCourse = this.state.course.code
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
                    <h2>Velg gjeldende fag</h2>
                    <DropdownButton className="dropdown" required id="dropdownNewReview" title={textCourse}>

                        {this.state.courses.map(course => (<Dropdown.Item className="dropdownItemReview" onClick={this.setCourse.bind(this, course)}>{course.coursecode} {course.name}</Dropdown.Item>))}
                    </DropdownButton>
                    <br></br>
                    <h2>Gi din vurdering av foreleseren </h2>
                    <label for="inputKnowledge">Kunnskap
                    <ReactStars count={6} onChange={this.ratingChangedKnowledge} size={24} activeColor="#1aa054" className="reactStar" /></label>
                    <br></br>
                    <label for="inputCommunication">Kommunikasjon
                    <ReactStars count={6} onChange={this.ratingChangedCommunication} size={24} activeColor="#1aa054" className="reactStar" /></label>
                    <br></br>
                    <label for="inputAssistance">Hjelpsomhet
                    <ReactStars count={6} onChange={this.ratingChangedAssistance} size={24} activeColor="#1aa054" className="reactStar" /></label>
                    <br></br>
                    <input className="submitTeacher" type="submit" value="Send inn"></input>
                </form>

            </div >
        );
    }
}

export default NewReview;