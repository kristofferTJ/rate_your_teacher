import React from 'react'

function Grade(props) {
    let letter
    const styles = {
        background: ""
    }

    if (props.grade > 5.00) {
        styles.background = "#00E640"
        letter = "A"
    } else if (4 < props.grade && props.grade <= 5) {
        styles.background = "#90E35D"
        letter = "B"
    } else if (3 < props.grade && props.grade <= 4) {
        styles.background = "#CEE92A"
        letter = "C"
    } else if (2 < props.grade && props.grade <= 3) {
        styles.background = "#FFC01E"
        letter = "D"
    } else if (1 < props.grade && props.grade <= 2) {
        styles.background = "#FF7E36"
        letter = "E"
    } else if (0 < props.grade && props.grade <= 1) {
        styles.background = "#F82D00"
        letter = "F"
    } else {
        styles.background = "#999999"
        letter = "NA"
    }

    return (
        <span style={styles}>
            <h2>{letter}</h2>
        </span>
    )
}

export default Grade;
