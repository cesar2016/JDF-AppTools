import React from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import {connect} from 'react-redux';
import { UIRouter, UIView, pushStateLocationPlugin} from '@uirouter/react';
import states from './routes/routes'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { esES } from '@material-ui/core/locale';
import Login from './components/users/Login';
import Tools from './components/tools/Tools';
import Navbar from './components/modules/Navbar';
import Sidebar from './components/modules/Sidebar';
import Home from './components/home/Home';
import Customers from './components/customers/Customers';
import Orders from './components/orders/Orders'

const plugins = [
  pushStateLocationPlugin
];

function App() {


    const theme = createMuiTheme({
      palette: {
        primary: { main: '#2196f3' },
        secundary: { main: '#ff1744' }
      },
    }, esES);

  return (
    <UIRouter plugins={plugins} states={states}>
      <CssBaseline>
        <ThemeProvider theme={theme}>
          {/* <UIView /> */}
          <Route exact path="/" component={Login} />
          <Route path="/home/" component={Navbar} />
          <Route path="/home/" component={Sidebar} />
          <Route exact path="/home" component={Home} /> 
          <Route exact path="/home/tools" component={Tools} />
          <Route exact path="/home/customers" component={Customers} />
          <Route exact path="/home/orders" component={Orders} />




        </ThemeProvider>
      </CssBaseline>
    </UIRouter>
  );
}

export default connect(null, null)(App);
