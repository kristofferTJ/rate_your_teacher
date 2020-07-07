import React from "react";
//mport apis from "./api";

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
                <div className="teacher" key={teacher}>
                    <img alt="avatar" src="/avatar.png"></img>
                    <h1>{teacher.name}</h1>
                    {teacher.courses.map(cours => (<p>{cours.course}</p>))}
                    <p>{teacher.grade}</p>
                </div>
            ))}
        </div>
    );
};

export default Teachers;
