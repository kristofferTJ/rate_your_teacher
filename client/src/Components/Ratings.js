import React from 'react'
import Card from 'react-bootstrap/Card'
import Rating from "./rating"
import Grade from "./Grade"

function Ratings({ id, gradeAverage, courses, name }) {

    const ratingComponents = courses.map((course) => {
        return course.ratings.map(rating => {
            return <Rating com={rating.communication} know={rating.knowledge} ass={rating.assistance} />})
    })

    const ratingsAmount = (courses) => {
        let count = 0

        courses.forEach((course) => { 
            return count += course.ratings.length;
        })
        return count
    }

    return (
        <Card className="ratingsCard" id={id}>
            <div className="ratingsCard-header" >
                <h1 className="name">{name} sine vurderinger</h1>
                <Grade grade={gradeAverage(courses, "total")}/>
                <h4>{ratingsAmount(courses)} vurderinger</h4>
            </div>
            <div className="ratingCards-container">
                {ratingComponents}
            </div>
        </Card>
    )
}

export default Ratings;
