import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import  { login } from '../actions/auth'
import Alert from './alert'
import { Redirect } from 'react-router-dom'


class LoginBox extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            email : "", 
            password : "", 
            errors: []
        };
    }

    showValidationError(elm, msg) {
        this.setState((prevState) => ( { errors: [...prevState.errors, {elm, msg}] } ));
    }

    clearValidationError(elm) {
        this.setState((prevState) => {
            let newArr = [];
            for(let err of prevState.errors) {
                if(elm !== err.elm) {
                    newArr.push(err);
                }
            }
            return {errors: newArr};
        });
    }

    onemailChange(e) {
        this.setState({ email: e.target.value });
        this.clearValidationError('email');

    }

    onPasswordChange(e) {
        this.setState({ password: e.target.value });
        this.clearValidationError('password');
    }

    submitLogin(e) {

        // don't remember from where i copied this code, but this works.
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const { email, password } = this.state

        if (this.state.email === '') {
            this.showValidationError('email', 'Emailfeltet kan ikke være tomt!')
        } else if (!(re.test(this.state.email)) ) {
            this.showValidationError('email', 'Det er ikke en gyldig Email!')
        }
        if (this.state.password === '') {
            this.showValidationError('password', 'Passordfeltet kan ikke være tomt!')
        }
        if ((this.state.email !== '') && (re.test(this.state.email)) && (this.state.password !== '')) {
            this.props.login({email, password})
        }
    }

    render() {

        //Redirect if logged in
        if (this.props.isAuthenticated) {
            return <Redirect to='/' />
        }


        let emailErr = null, passwordErr = null;

        for(let err of this.state.errors) {
            if(err.elm === 'email') {
                emailErr = err.msg;
            }
            if (err.elm === 'password') {
                passwordErr = err.msg;
            }
        }

        return (
            
            <div className="inner-container">
                <div className="header">
                    Logg Inn
                </div>
                <div className="box">

                    <Alert />
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type='email' 
                            name='email' 
                            value={this.state.email}
                            className='login-input' 
                            placeholder='Ola.normann@domene.no' 
                            onChange={this.onemailChange.bind(this)}
                        />
                        <small className="danger-error">{ emailErr ? emailErr : '' }</small>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Passord</label>
                        <input 
                            type='password' 
                            name='password' 
                            className='login-input' 
                            placeholder='Passord'
                            onChange={this.onPasswordChange.bind(this)}
                        />
                        <small className="danger-error">{ passwordErr 
                            ? passwordErr 
                            : '' }</small>
                    </div>

                    <button type='button' className='login-btn' onClick={this.submitLogin.bind(this)}>Logg Inn</button>
                </div>
            </div>
        );
    }
}

LoginBox.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(LoginBox)
