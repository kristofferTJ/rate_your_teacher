import React from 'react'
import Card from 'react-bootstrap/Card'
import Grade from './Grade'


function GradeCard() {
    return (
        <Card className="GradeCard">
            <h1>Karakterkort</h1>
            <div className="totalGrade">
                <Grade grade="A" >A</Grade>
            </div>
            <h3>Total Karakter</h3>

            <div className="column1">
                <div className="grade">
                    <Grade grade="A" />
                    <h3>Fagkunnskaper</h3>
                </div>
                <div className="grade">
                    <Grade grade="C" />
                    <h3>Fagkunnskaper</h3>
                </div>
                <div className="grade">
                    <Grade grade="B" />
                    <h3>Fagkunnskaper</h3>
                </div>
                <div className="grade">
                    <Grade grade="D" />
                    <h3>Fagkunnskaper</h3>
                </div>
            </div>

            <div className="column2">
                <div className="grade">
                    <Grade grade="A" />
                    <h3>Fagkunnskaper</h3>
                </div>
                <div className="grade">
                    <Grade grade="C" />
                    <h3>Fagkunnskaper</h3>
                </div>
                <div className="grade">
                    <Grade grade="B" />
                    <h3>Fagkunnskaper</h3>
                </div>
                <div className="grade">
                    <Grade grade="D" />
                    <h3>Fagkunnskaper</h3>
                </div>
            </div>
        </Card>
    )
}

export default GradeCard;
