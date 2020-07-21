import React from 'react';
import { Link } from "react-router-dom";

function App() {
    return (
        <div className="navbar">
            <Link className="navbarLink" to="/"><p><img alt="logo"></img></p></Link>
            <Link className="navbarLink" to="/OmOss"><p>Om oss</p></Link>
            <p>Kontakt</p>
            <Link className="navbarLink" to="/LoggInn"><p>Logg inn</p></Link>
        </div>
    );
}

export default App;
