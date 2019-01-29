import React from 'react'
import { Box, FormField, TextInput, Button, Text, Heading } from 'grommet'
import { Edit } from 'grommet-icons'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const loginquery = gql`
    mutation AdminLogin($username:String!, $password:String!){
        adminLogin(username:$username, password:$password)
    }
`

class Login extends React.Component {
    constructor(props){
        super()
        this.state = {
            username:'', password:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    handleChange(e) {
        let { name, value } = e.target 
        this.setState({
            [name]: value
        })
    }
    async handleLogin() {
        let { username, password } = this.state
        let response = await this.props.mutate({
            variables: { username, password }
        })
        let token = response.data.adminLogin 
        console.log(token)
        await localStorage.setItem('bid-admin-token', token)
        this.props.history.push('/dashboard')
    }
    render() {
    return(
        <Box
        direction="row-responsive"
        justify="center"
        align="center"
        pad="xlarge"
        background="neutral-1"
        gap="medium"
        style={{minHeight: '100vh'}}
        >
        <Box
        direction="column"
        pad="large"
        align="center"
        background={{ color: "light-1", opacity: "mild" }}
        round
        gap="small"
        style={{minHeight: '50vh'}}
        >
        <Heading level="3" color="neutral-1">
            Satta Matka Admin Panel
        </Heading>
        <FormField label="Username" htmlFor="username" >
        <TextInput
            placeholder="type your username..."
            value={this.state.username}
            name="username"
            onChange={this.handleChange}
        />
        </FormField>
        <FormField label="Password" htmlFor="password" >
        <TextInput
            placeholder="password goes here..."
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
        />
        </FormField>
        <Button label="Login" onClick={this.handleLogin}/>
        </Box>
        </Box>
    )
}}

export default graphql(loginquery)(Login)
