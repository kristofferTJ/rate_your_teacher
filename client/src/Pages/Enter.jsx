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
                    <label htmlFor="mail">Mail</label>
                    <input type='text' name='mail' className='login-input' placeholder='Mail'/>
                </div>

                <div className="input-group">
                    <label htmlFor="password">Passord</label>
                    <input type='password' name='password' className='login-input' placeholder='Passord'/>
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
        this.state = {  };
    }

    submitRegister(e) {

    }

    render() {
        return (
        <div className="inner-container">
            <div className="header">
                Registrer
            </div>
            <div className="box">

                <div className="input-group">
                    <label htmlFor="mail">Mail</label>
                    <input type='text' name='mail' className='login-input' placeholder='Ola.normann@domene.no'/>
                </div>

                <div className="input-group">
                    <label htmlFor="Mail">Bekreft mail</label>
                    <input type='text' name='Mail' className='login-input' placeholder='Gjenta mail'/>
                </div>

                <div className="input-group">
                    <label htmlFor="password">Passord</label>
                    <input type='password' name='password' className='login-input' placeholder='Passord'/>
                </div>

                <div className="input-group">
                    <label htmlFor="password">Bekreft passord</label>
                    <input type='password' name='ConfirmPassword' className='login-input' placeholder='Gjenta passord'/>
                </div>

                <button type='button' className='login-btn' onClick={this.submitRegister.bind(this)}>Registrer</button>
            </div>
        </div>
        );
    }
}


export default Enter;