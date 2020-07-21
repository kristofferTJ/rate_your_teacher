import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

//Pages
import HomePage from './Pages/HomePage';
import Enter from './Pages/Enter';
import NotFoundPage from './Pages/NotFoundPage';
import TeacherPage from './Pages/TeacherPage';
import NewTeacherPage from './Pages/NewTeacherPage';
import RequestPage from './Pages/RequestPage';
import OmOss from './Pages/RequestPage';


class AppTemp extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/404' component={NotFoundPage} />
          <Route exact path='/LoggInn' component={Enter} />
          <Route exact path='/TeacherPage' component={TeacherPage} />
          <Route exact path='/NewTeacher' component={NewTeacherPage} />
          <Route exact path='/Request' component={RequestPage} />
          <Route exact path='/OmOss' component={OmOss} />
          <Redirect to='/404' />
        </Switch>
      </Router>
    );
  }
}

export default AppTemp;
