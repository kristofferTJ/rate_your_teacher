import React from 'react'
import Card from 'react-bootstrap/Card'
import Grade from "./Grade"



export default function rating({com, know, ass}) {

    return (
        <Card className="ratingCard" >
            <div className="grades">
                <Grade grade={com} />
                <h3>Kommunikasjon</h3>
            </div>
            <div className="grades">
                <Grade grade={know} />
                <h3>Kunnskap</h3>
            </div>
            <div className="grades">
                <Grade grade={ass} />
                <h3>Hjelpsomhet</h3>
            </div>
        </Card>
    )
}



