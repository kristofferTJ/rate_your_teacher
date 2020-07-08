import React, { Component} from 'react';
import { 
    BrowserRouter as Router, 
    Route, 
    Switch, 
    Link, 
    Redirect 
} from 'react-router-dom';

//Pages
import HomePage from './Pages/HomePage';
import Enter from './Pages/Enter';
import NotFoundPage from './Pages/404';


class AppTemp extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/404' component={NotFoundPage} />
                    <Route exact path='/LoggInn' component={Enter} />
                    <Redirect to='/404'/>
                </Switch>
            </Router>
        );
    }
}

export default AppTemp;
