import React from "react";
import avatar from '../avatar.png'
import { Link } from "react-router-dom";

//git mport apis from "./api";

//await apis.getAllTeachers().then(teachers => { })
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
                <Link to="/teacher_page">
                    <div className="teacher" key={teacher}>
                        <img alt="avatar" src={avatar}></img>
                        <div className="teacher_info"><h1>{teacher.name}</h1>
                            {teacher.courses.map(cours => (<p key={cours}>{cours.course}</p>))}</div>
                        <p className="teacher_total_grade">{teacher.grade}</p>
                        <div className="teacher_grades"><p>Karakter <br></br> karakter <br></br> karakter</p></div>
                    </div>
                </Link>
            ))
            }
        </div >
    );
};

export default Teachers;
