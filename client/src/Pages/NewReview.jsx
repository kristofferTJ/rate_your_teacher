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
            id: this.props.location.state.id,
            teacher: '',
            courses: [],
            course: {
                id: '',
                code: ''
            },
            user: '',
            communication: '',
            knowledge: '',
            assistance: '',
            assignments: '',
            book: '',
            passion: '',
            language: '',
            isLoading: false
        }
        this.setCourse = this.setCourse.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.ratingChanged = this.ratingChanged.bind(this)
        this.ratingChangedAssignment = this.ratingChangedAssignment.bind(this)
        this.ratingChangedBook = this.ratingChangedBook.bind(this)
    }

    setCourse = (course) => {
        this.setState({
            course: {
                id: course._id,
                code: course.coursecode
            }
        })
    }

    ratingChanged(skill, newRating) {
        this.setState({ [skill]: newRating })
    }

    ratingChangedAssignment(rating) {
        this.setState({ assignments: rating })
    }

    ratingChangedBook(rating) {
        this.setState({ book: rating })
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


            const body = JSON.stringify({ communication: this.state.communication, knowledge: this.state.knowledge, assistance: this.state.assistance, assignments: this.state.assignments, book: this.state.book })

            console.log("body" + body)

            const res = await axios.put('http://localhost:8000/api/studentprofile/' + this.state.teacher._id + '/' + this.state.course.id, body, config)
            //this.showValidationError('email', "User registered")
            //console.log(res.data)
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

        const setTextAssignment = () => {
            if (this.state.assignments === "") {
                textAssignment = "J/N"
            } else if (this.state.assignments == 1) {
                textAssignment = "Ja"
            } else (
                textAssignment = "Nei"
            )
        }
        var textAssignment = ""
        setTextAssignment();

        const setTextBook = () => {
            if (this.state.book === "") {
                textBook = "J/N"
            } else if (this.state.book == 1) {
                textBook = "Ja"
            } else (
                textBook = "Nei"
            )
        }
        var textBook = ""
        setTextBook();

        console.log(this.state.assignments)
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
                    <ReactStars count={6} onChange={this.ratingChanged.bind(this, "knowledge")} size={24} activeColor="#1aa054" className="reactStar" /></label>
                    <br></br>
                    <label for="inputCommunication">Kommunikasjon
                    <ReactStars count={6} onChange={this.ratingChanged.bind(this, "communication")} size={24} activeColor="#1aa054" className="reactStar" /></label>
                    <br></br>
                    <label for="inputAssistance">Hjelpsomhet
                    <ReactStars count={6} onChange={this.ratingChanged.bind(this, "assistance")} size={24} activeColor="#1aa054" className="reactStar" /></label>
                    <br></br>
                    <label for="inputAssignment">Var øvingene nyttige?
                    <DropdownButton className="dropdown" required id="dropdownNewReview" title={textAssignment}>
                            <Dropdown.Item className="dropdownItemReview" onClick={this.ratingChangedAssignment.bind(this, 1)}>Ja</Dropdown.Item>
                            <Dropdown.Item className="dropdownItemReview" onClick={this.ratingChangedAssignment.bind(this, 0)}>Nei</Dropdown.Item>
                        </DropdownButton></label>
                    <br></br>
                    <label for="inputBook">Brukte du boken?
                    <DropdownButton className="dropdown" required id="dropdownNewReview" title={textBook}>
                            <Dropdown.Item className="dropdownItemReview" onClick={this.ratingChangedBook.bind(this, 1)}>Ja</Dropdown.Item>
                            <Dropdown.Item className="dropdownItemReview" onClick={this.ratingChangedBook.bind(this, 0)}>Nei</Dropdown.Item>
                        </DropdownButton></label>
                    <br></br>
                    <input className="submitTeacher" type="submit" value="Send inn"></input>
                </form>

            </div >
        );
    }
}

export default NewReview;