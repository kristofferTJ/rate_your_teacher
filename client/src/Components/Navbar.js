import React from 'react';
import { Link } from "react-router-dom";

function App() {
    return (
        <div className="navbar">
            <p><img alt="logo"></img></p>
            <p>Om oss</p>
            <p>Kontakt</p>
            <Link className="link" to="/LoggInn">
                <p>Logg inn</p></Link>
        </div>
    );
}

export default App;
