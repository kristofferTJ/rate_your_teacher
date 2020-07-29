import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'
import './App.css'

//Pages
import HomePage from './Pages/HomePage';
import Enter from './Pages/Enter';
import NotFoundPage from './Pages/NotFoundPage';
import TeacherPage from './Pages/TeacherPage';
import NewTeacherPage from './Pages/NewTeacherPage';
import RequestPage from './Pages/RequestPage';
import OmOss from './Pages/OmOss';
import SentRequest from './Pages/SentRequest';

//Redux
import { Provider } from 'react-redux'
import store from './store'

//Kan hende dette er feil. Se "Set user and load Auth token"
if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/404' component={NotFoundPage} />
          <Route exact path='/LoggInn' component={Enter} />
          <Route exact path='/TeacherPage' component={TeacherPage} />
          <Route exact path='/NewTeacher' component={NewTeacherPage} />
          <Route exact path='/Request' component={RequestPage} />
          <Route exact path='/OmOss' component={OmOss} />
          <Route exact path='/SentRequest' component={SentRequest} />
          <Redirect to='/404' />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
