import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import { createHistory, useBasename} from 'history';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from './store/';


import Main from './Main.jsx';
import Login from './components/pages/Login.jsx';
import Register from './components/pages/Register.jsx';
import Dashboard from './components/pages/Dashboard.jsx';
import Vehicles from './components/pages/Vehicles.jsx';
import Specifications from './components/pages/Specifications.jsx';

//Needed for Material UI
injectTapEventPlugin();
//Needed to make calls to the web services

const store = configureStore();
const history = useBasename(createHistory)({basename: '/'});

render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Main}>
                <IndexRoute component={Dashboard}/>
                <Route path="login" component={Login}/>
                <Route path="register" component={Register}/>
                <Route path="vehicles" component={Vehicles}/>
                <Route path="specifications" component={Specifications}/>
                <Route path="/model/edit/:id" component={Specifications}/>
                <Route path="/model/add/:year" component={Specifications}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'));



