import React from "react";

const Teachers = () => {
    const teachers = [
        {
            name: "Per",
            age: 56,
            grade: "A"
        },
        {
            name: "Arne",
            age: 43,
            grade: "C"
        },
        {
            name: "Kari",
            age: 51,
            grade: "B"
        },
        {
            name: "Kåre",
            age: 32,
            grade: "D"
        },
        {
            name: "Bob",
            age: 39,
            grade: "E"
        },
        {
            name: "Kjersti",
            age: 59,
            grade: "A"
        }
    ];
    return (
        <div title="Forelesere" class="teachers ">
            {teachers.map(teacher => (
                <div class="teacher" key={teacher}>{teacher.name}, {teacher.age}, {teacher.grade}</div>
            ))}
        </div>
    );
};

export default Teachers;
