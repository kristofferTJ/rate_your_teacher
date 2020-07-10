import React from 'react'
import '../sass/_loginSty.scss'
import NavBar from '../Components/Navbar'



class Enter extends React.Component {

    constructor(props){
        super(props);
        this.state = {isLoginOpen: true, isRegisterOpen:false};
    }

    showLoginBox() {
        this.setState({isLoginOpen:true, isRegisterOpen:false});
    }

    showRegisterBox() {
        this.setState({isRegisterOpen:true, isLoginOpen:false});
    }

    render() {

        return (
            
            <div>
                <NavBar />

                <div className='root-container'>

                    <div className='box-controller'>
                        <div className={'controller ' + (this.state.isLoginOpen ? 'selected-controller' : '')} 
                        onClick={this
                        .showLoginBox
                        .bind(this)}>
                            Logg Inn
                        </div>
                        <div className={'controller ' + (this.state.isRegisterOpen ? 'selected-controller' : '')} 
                        onClick={this
                        .showRegisterBox
                        .bind(this)}>
                            Registrer
                        </div>
                    </div>

                    <div className='box-container'>
                        {this.state.isLoginOpen && <LoginBox/>}
                        {this.state.isRegisterOpen && <RegisterBox/>}
                    </div>
            
                </div>
            </div>
        );
    }
}


class LoginBox extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            email : "", 
            password : "", 
            errors: [],
            pwdState: null };
    }

    showValidationError(elm, msg) {
        this.setState((prevState) => ( { errors: [...prevState.errors, {elm, msg}] } ));
    }

    clearValidationError(elm) {
        this.setState((prevState) => {
            let newArr = [];
            for(let err of prevState.errors) {
                if(elm != err.elm) {
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


        if (this.state.email == '') {
            this.showValidationError('email', 'Emailfeltet kan ikke være tomt!')
        } else if (!(re.test(this.state.email)) ) {
            this.showValidationError('email', 'Det er ikke en gyldig Email!')
        }
        if (this.state.password == '') {
            this.showValidationError('password', 'Passordfeltet kan ikke være tomt!')
        }
    }

    render() {


        let emailErr = null, passwordErr = null;

        for(let err of this.state.errors) {
            if(err.elm == 'email') {
                emailErr = err.msg;
            }
            if (err.elm == 'password') {
                passwordErr = err.msg;
            }
        }

        return (
            
            <div className="inner-container">
                <div className="header">
                    Logg Inn
                </div>
                <div className="box">

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

class RegisterBox extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            email : "", 
            password : "",
            confirmPassword : "", 
            errors: [],
            pwdState: null, };
    }

    showValidationError(elm, msg) {
        this.setState((prevState) => ( { errors: [...prevState.errors, {elm, msg}] } ));
    }

    clearValidationError(elm) {
        this.setState((prevState) => {
            let newArr = [];
            for(let err of prevState.errors) {
                if(elm != err.elm) {
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


        this.setState({ pwdState: 'weak'});
        if(e.target.value.length > 8) {
            this.setState({ pwdState: 'medium' });
        } if (e.target.value.length > 12 ) {
            this.setState({ pwdState: 'strong'});
        }
    }

    onConfirmPasswordChange(e) {
        this.setState({ confirmPassword: e.target.value});
        this.clearValidationError('confirmPassword');
    }

    submitRegister(e) {

        // don't remember from where i copied this code, but this works.
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


        if (this.state.email == '') {
            this.showValidationError('email', 'Emailfeltet kan ikke være tomt!')
        } else if (!(re.test(this.state.email)) ) {
            this.showValidationError('email', 'Det er ikke en gyldig Email!')
        }
        if (this.state.password == '') {
            this.showValidationError('password', 'Passordfeltet kan ikke være tomt!')
        }
        if (this.state.confirmPassword != this.state.password) {
            this.showValidationError('confirmPassword', 'Passordet er ikke gjentatt korrekt')
        }


    }

    render() {

        let emailErr = null, passwordErr = null, confirmPasswordErr = null;

        for(let err of this.state.errors) {
            if(err.elm == 'email') {
                emailErr = err.msg;
            }
            if (err.elm == 'password') {
                passwordErr = err.msg;
            }
            if (err.elm == 'confirmPassword') {
                confirmPasswordErr = err.msg;
            }
        }

        let pwdWeak = false, pwdMedium = false, pwdStrong = false;

        if( this.state.pwdState == 'weak') {
            pwdWeak = true;
        } else if( this.state.pwdState == 'medium') {
            pwdWeak = true;
            pwdMedium = true;
        } else if( this.state.pwdState == 'strong') {
            pwdWeak = true;
            pwdMedium = true;
            pwdStrong = true;
        } 


        return (
        <div className="inner-container">
            <div className="header">
                Registrer
            </div>
            <div className="box">

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
                    
                    <div className="password-state">
                        <div className= {"pwd pwd-weak " + (pwdWeak ? 'show' : '')} ></div>
                        <div className={"pwd pwd-medium " + (pwdMedium ? 'show' : '')}></div>
                        <div className={"pwd pwd-strong " + (pwdStrong ? 'show' : '')}></div>
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="password">Bekreft passord</label>
                    <input 
                    type='password' 
                    name='ConfirmPassword' 
                    className='login-input' 
                    placeholder='Gjenta passord'
                    onChange={this.onConfirmPasswordChange.bind(this)} 
                    />
                    <small className="danger-error">{ confirmPasswordErr ? confirmPasswordErr : '' }</small>
                </div>

                <button type='button' className='login-btn' onClick={this.submitRegister.bind(this)}>Registrer</button>
            </div>
        </div>
        );
    }
}


export default Enter;
