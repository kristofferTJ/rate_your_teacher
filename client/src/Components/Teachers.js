import React from "react";

const Teachers = () => {
    const teachers = [
        {
            name: "Per",
            age: 56
        },
        {
            name: "Arne",
            age: 43
        },
        {
            name: "Kari",
            age: 51
        },
        {
            name: "Kåre",
            age: 32
        }
    ];
    return (
        <div title="Forelesere" class="teachers ">
            {teachers.map(teacher => (
                <div class="teacher" key={teacher}>{teacher.name}, {teacher.age}</div>
            ))}
        </div>
    );
};

export default Teachers;
