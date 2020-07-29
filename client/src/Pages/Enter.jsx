import React from 'react'
import '../sass/_loginSty.scss'
import NavBar from '../Components/Navbar'
import LoginBox from '../Components/LogInBox'
import RegisterBox from '../Components/RegisterBox'



class Enter extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isLoginOpen: true, isRegisterOpen: false };
    }

    showLoginBox() {
        this.setState({ isLoginOpen: true, isRegisterOpen: false });
    }

    showRegisterBox() {
        this.setState({ isRegisterOpen: true, isLoginOpen: false });
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
                        {this.state.isLoginOpen && <LoginBox />}
                        {this.state.isRegisterOpen && <RegisterBox />}
                    </div>

                </div>
            </div>
        );
    }
}


export default Enter;
