import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Grommet } from 'grommet'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { hp } from 'grommet-theme-hp'
// write a private route
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props)=>(
      localStorage.getItem('bid-admin-token') ? (< Component {...props}/>) : 
          <Redirect to ="/"/>    
  )}/>
)

class Routes extends Component {
  render() {
    return (
        <Router>
          <Grommet full={true} theme={hp}>
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            {/* <Route component={Login} /> */}
          </Switch>
          
          </Grommet>
        </Router>
      )
    }  
}

export default Routes

const theme = {
  
}