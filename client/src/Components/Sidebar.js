import React from 'react'
import { Link } from "react-scroll";

export default function Sidebar() {

    return (
        <nav className="menu">
            <ul>
                <li><a href="#section1">Karakterkort</a></li>
                <li><a href="#section2">Annen undervisning</a></li>
                <li><a href="#section3">Vurderinger</a></li>
            </ul>
        </nav>
    )
}
