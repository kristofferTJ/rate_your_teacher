import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    return (
        <div className="navbar">
            <Link className="navbarLink" to="/"><p><img alt="logo"></img></p></Link>
            <p>Om oss</p>
            <p>Kontakt</p>
            {!loading &&
                (<Fragment>{isAuthenticated ?
                    <a onClick={logout} className="navbarLink" href='#!'>Logg Ut</a> :
                    <Link className="navbarLink" to="/LoggInn"><p>Logg Inn</p></Link>}
                </Fragment>)}
        </div>
    );
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)
