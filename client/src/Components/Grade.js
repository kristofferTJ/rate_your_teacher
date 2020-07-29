import React, {useState, useEffect} from 'react'

function Grade({ grade }) {
    const [backgroundColor, setColor] = useState("#00E540");

    useEffect(() => {
        if (grade === "A") {
            setColor(() => "#00E640")
        } else if (grade === "B") {
            setColor(() => "#90E35D")
        } else if (grade === "C") {
            setColor(() => "#CEE92A")
        } else if (grade === "D") {
            setColor(() => "#FFC01E")
        } else if (grade === "E") {
            setColor(() => "#FF6745")
        } else if (grade === "F") {
            setColor(() => "#F82D00")
        }
    },[])
    
    return (
            <span style={{backgroundColor}}>
                <h2>{grade}</h2>
            </span>
    )
}

export default Grade;
