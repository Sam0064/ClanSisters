import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pageComponents/HomePage.jsx';
import { Provider } from 'react-redux';
import configureStore from './configureStore.js';
import Login from './pageComponents/LoginPage.jsx';
import User from './pageComponents/UserPage.jsx';
import Clan from './pageComponents/ClanPage.jsx';
import Forum from './pageComponents/ForumPage.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import './styles.css';



let store = configureStore();

const App = () => (
  <div>
    <Switch>
      <Route exact path = '/home' >
        <Home />
      </Route>
      <Route exact path = '/login' >
        <Login />
      </Route>
      <Route exact path = '/user' >
        <User />
      </Route>
      <Route exact path = '/clan' >
        <Clan />
      </Route>
      <Route exact path ='/forum' >
        <Forum />
      </Route>
    </Switch>
  </div>
)

/** Render App using React Router. */
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
, document.getElementById('root') || document.createElement('div'))

export default App
