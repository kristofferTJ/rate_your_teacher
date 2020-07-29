import React from 'react'
import Card from 'react-bootstrap/Card'
import Grade from './Grade'


function GradeCard() {
    return (
        <Card className="GradeCard">
            <h1>Karakterkort</h1>
            <div className="totalGrade">
                <Grade grade="A" />
                <h3>Total Karakter</h3> 
            </div>

                <div className="grades">
                    <Grade grade="A" />
                    <h3>Fagkunnskaper</h3>
                </div>
                <div className="grades">
                    <Grade grade="C" />
                    <h3>Fagkunnskaper</h3>
                </div>
                <div className="grades">
                    <Grade grade="B" />
                    <h3>Fagkunnskaper</h3>
                </div>
                <div className="grades">
                    <Grade grade="D" />
                    <h3>Fagkunnskaper</h3>
                </div>
                <div className="grades">
                    <Grade grade="A" />
                    <h3>Fagkunnskaper</h3>
                </div>
                <div className="grades">
                    <Grade grade="C" />
                    <h3>Fagkunnskaper</h3>
                </div>
                <div className="grades">
                    <Grade grade="B" />
                    <h3>Fagkunnskaper</h3>
                </div>
                <div className="grades">
                    <Grade grade="D" />
                    <h3>Fagkunnskaper</h3>
                </div>
        </Card>
    )
}

export default GradeCard;
