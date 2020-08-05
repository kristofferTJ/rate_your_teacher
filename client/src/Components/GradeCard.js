import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Grade from './Grade'



function GradeCard({courses, id}) {



    const gradeAverage = (co, skill) => {
        var grades = 0
        var gradeCount = 0
        var avg = 0

        if (co.length > 0) {
            if (skill === "total") {
                { co.map(course => course.ratings.map(rating => grades += (rating.knowledge + rating.communication + rating.assistance))) }
                { co.map(course => course.ratings.map(rating => gradeCount += 3)) }
            } else {
                co.forEach((course) => course.ratings.forEach((rating) => grades += rating[skill]))
                co.forEach((course) => course.ratings.forEach((rating) => gradeCount += 1))
            }

            avg = grades / gradeCount

            return avg
        } else {
            return 0
        }
    }

    return (
        <Card className="GradeCard" id={id} >
            <h1>Karakterkort</h1>
            <div className="totalGrade">
                <Grade grade={gradeAverage(courses, "total")} />
                <h3>Total Karakter</h3>
            </div>
            <div className="grades">
                <Grade grade={gradeAverage(courses, "communication")} />
                <h3>Kommunikasjon</h3>
            </div>
            <div className="grades">
                <Grade grade={gradeAverage(courses, "knowledge")} />
                <h3>Kunnskap</h3>
            </div>
            <div className="grades">
                <Grade grade={gradeAverage(courses, "assistance")} />
                <h3>Hjelpsomhet</h3>
            </div>
            <div className="grades">
                <Grade grade={gradeAverage(courses, "communication")} />
                <h3>Fagkunnskaper</h3>
            </div>
            <div className="grades">
                <Grade grade={gradeAverage(courses, "communication")} />
                <h3>Fagkunnskaper</h3>
            </div>
            <div className="grades">
                <Grade grade={gradeAverage(courses, "communication")} />
                <h3>Fagkunnskaper</h3>
            </div>
            <div className="grades">
                <Grade grade={gradeAverage(courses, "communication")} />
                <h3>Fagkunnskaper</h3>
            </div>
            <div className="grades">
                <Grade grade={gradeAverage(courses, "communication")} />
                <h3>Fagkunnskaper</h3>
            </div>
        </Card>
    )
}

export default GradeCard;
