import React from 'react'
import '../sass/_loginSty.scss'



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
            <div className='root-container'>

                <div className='box-controller'>
                    <div className='controller' onClick={this.showLoginBox.bind(this)}>
                        Login
                    </div>
                    <div className='controller' onClick={this.showRegisterBox.bind(this)}>
                        Register
                    </div>
                </div>

                <div className='box-container'>
                {this.state.isLoginOpen && <LoginBox/>}
                {this.state.isRegisterOpen && <RegisterBox/>}
                </div>

            </div>
        );
    }
}


class LoginBox extends React.Component {

    constructor(props){
        super(props);
        this.state = {  };
    }

    submitLogin(e) {

    }

    render() {
        return (
        <div className="inner-container">
            <div className="header">
                Logg Inn
            </div>
            <div className="box">

                <div className="input-group">
                    <label htmlFor="username">UserName</label>
                    <input type='text' name='username' className='login-input' placeholder='username'/>
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type='password' name='password' className='login-input' placeholder='password'/>
                </div>

                <button type='button' className='login-btn' onClick={this.submitLogin.bind(this)}>Login</button>
            </div>
        </div>
        );
    }
}

class RegisterBox extends React.Component {

    constructor(props){
        super(props);
        this.state = {  };
    }

    submitRegister(e) {

    }

    render() {
        return (
        <div className="inner-container">
            <div className="header">
                Register
            </div>
            <div className="box">

                <div className="input-group">
                    <label htmlFor="username">UserName</label>
                    <input type='text' name='username' className='login-input' placeholder='username'/>
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type='password' name='password' className='login-input' placeholder='password'/>
                </div>

                <button type='button' className='login-btn' onClick={this.submitRegister.bind(this)}>Register</button>
            </div>
        </div>
        );
    }
}


export default Enter;