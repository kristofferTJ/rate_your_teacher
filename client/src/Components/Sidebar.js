import React from 'react'
import {Link, animatedScroll as scroll } from "react-scroll";

export default function Sidebar() {
    return (
        <div className="menu">
            <Link 
                activeClass="active" 
                to="section1" 
                spy={true} 
                smooth={true} 
                offset={-70} 
                duration={500} 
            >
                <h3 className="item1">Karakterkort</h3>
            </Link>
            <Link 
                activeClass="active" 
                to="section2" 
                spy={true} 
                smooth={true} 
                offset={-70} 
                duration={500} 
            >
                <h3 className="item2">Annen undervisning</h3>
            </Link>
            <Link 
                activeClass="active" 
                to="section3" 
                spy={true} 
                smooth={true} 
                offset={-70} 
                duration={500} 
            >
                <h3 className="item3">Vurderinger</h3>
            </Link>
        </div>
    )
}
