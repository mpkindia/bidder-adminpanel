import React from 'react'
import { Grid, Box, Button, Text, Heading } from 'grommet'
import { Switch, Route, Link } from 'react-router-dom'
import Credits from './Tabs/Credits'
import Results from './Tabs/Results'
import Accounts from './Tabs/Accounts'
import Reports from './Tabs/Reports'
import Bazaars from './Tabs/Bazaars'
import Rates from './Tabs/Rates'
import NoticeBoard from './Tabs/NoticeBoard'

const Home = () => {
    return(
        <React.Fragment>
        <Heading level={3}>
            Dashboard
        </Heading>
        <Box background="light-4" pad="small">
            Coming Soon...
        </Box>
        </React.Fragment>
        )
}


const dashboardRoutes = [
    {
        path: "/dashboard",
        exact: true,
        component: Home
    },
    {
        path: "/dashboard/accounts",
        exact: true,
        component: Accounts
    },
    {
        path: "/dashboard/bazaars",
        exact: true,
        component: Bazaars
    },
    {
        path: "/dashboard/reports",
        exact: true,
        component: Reports
    },
    {
        path: "/dashboard/credits",
        exact: true,
        component: Credits
    },
    {
        path: "/dashboard/results",
        exact: true,
        component: Results
    },
    {
        path: "/dashboard/nb",
        exact: true,
        component: NoticeBoard
    },
    {
        path: "/dashboard/rates",
        exact: true,
        component: Rates
    }
]

class Dashboard extends React.Component {
    constructor(){
        super()
        this.logout = this.logout.bind(this)
    }
    async logout() {
        console.log('logout')
        //remove all the tokens
        localStorage.removeItem('bid-admin-token')
        this.props.history.push('/')
    }
    render() {
        const { pathname } = this.props.location
    return (
        <div>
        <Grid
          fill
          rows={["auto", "flex"]}
          columns={["auto", "flex"]}
          areas={[
            { name: "header", start: [0, 0], end: [1, 0] },
            { name: "sidebar", start: [0, 1], end: [0, 1] },
            { name: "main", start: [1, 1], end: [1, 1] }
          ]}
        >
          <Box
            gridArea="header"
            direction="row"
            align="center"
            justify="between"
            pad={{ horizontal: "medium", vertical: "small" }}
            background="light-1"
            elevation="medium"
          >
          <Link to="/dashboard" style={{textDecoration: 'none'}}>

              <Text color="neutral-1" size="large">Satta Matka Admin Panel</Text>

          </Link>
        <Box  background="light-4" pad="xsmall"  >
        <Button onClick={this.logout}>Logout</Button>
        </Box>
        </Box>
          
            <Box align="center"
              gridArea="sidebar"
              background="neutral-1"
              elevation="medium"
              width="small"
              animation={[
                { type: "fadeIn", duration: 300 },
                { type: "slideRight", size: "xlarge", duration: 150 }
              ]}
              style={{minHeight: '92vh'}}
            >

            <Link to='/dashboard' style={{textDecoration: 'none'}}>
            <Box  background="light-1" pad="small" margin="small" round 
                    elevation={pathname.split('/').length===2 ? "medium":''} 
                 >
                <Text > Dashboard </Text> 
            </Box>
            </Link>

            <Link to='/dashboard/bazaars' style={{textDecoration: 'none'}}>
            <Box  background="light-1" pad="small" margin="small" round 
                    elevation={pathname.split('/')[2]==='bazaars' ? "medium":''} 
                 >
                <Text > Manage Bazaars </Text> 
            </Box>
            </Link>

            <Link to='/dashboard/credits' style={{textDecoration: 'none'}}>
            <Box  background="light-1" pad="small" margin="small" round 
                    elevation={pathname.split('/')[2]==='credits' ? "medium":''} 
                 >
                <Text > User-Credits</Text> 
            </Box>
            </Link>

            <Link to='/dashboard/accounts' style={{textDecoration: 'none'}}>
            <Box  background="light-1" pad="small" margin="small" round 
                    elevation={pathname.split('/')[2]==='accounts' ? "medium":''}
            >
                <Text > User-Accounts</Text> 
            </Box>
            </Link>

            <Link to='/dashboard/results' style={{textDecoration: 'none'}}>
            <Box  background="light-1" pad="small" margin="small" round 
                    elevation={pathname.split('/')[2]==='results' ? "medium":''}
            >
                <Text >Game-Results</Text> 
            </Box>
            </Link>
            <Link to='/dashboard/rates' style={{textDecoration: 'none'}}>
            <Box  background="light-1" pad="small" margin="small" round 
                    elevation={pathname.split('/')[2]==='rates' ? "medium":''}
            >
                <Text >Game-Rates</Text> 
            </Box>
            </Link>

            <Link to='/dashboard/reports' style={{textDecoration: 'none'}}>
            <Box  background="light-1" pad="small" margin="small" round 
                elevation={pathname.split('/')[2]==='reports' ? "medium":''}
            >
                <Text > Reports </Text> 
            </Box>
            </Link>

            <Link to='/dashboard/nb' style={{textDecoration: 'none'}}>
            <Box  background="light-1" pad="small" margin="small" round 
                elevation={pathname.split('/')[2]==='nb' ? "medium":''}
            >
                <Text > Notice Board </Text> 
            </Box>
            </Link>

            </Box>
          <Box gridArea="main" pad={{horizontal: 'small'}} >
          <Switch>
                {dashboardRoutes.map((item, index)=>(
                    <Route key={index} 
                            exact={item.exact}
                            path={item.path}
                            component={item.component}
                        />
                ))}
            </Switch>
          </Box>
        </Grid>
    </div>
    )
}
}

export default Dashboard