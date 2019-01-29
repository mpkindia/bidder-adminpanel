import React from 'react'
import { Heading, Box, Table, Text, TableHeader, TableRow, TableCell, TableBody, Button, CheckBox, TextInput} from 'grommet'
import { Update } from 'grommet-icons'
import { getAllUsers } from '../../../apolloclient/queries/user'
import { assignCredits } from '../../../apolloclient/mutations/user'
import { graphql } from 'react-apollo'

class InputBox extends React.Component {
  constructor(props){
    super()
    this.state = {
       credits: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  } 
  handleChange(e){
    let value = e.target.value
    this.setState({ credits: value })
  }
  async handleSubmit(){
    let id = this.props.user_id
    let credits = this.state.credits
    await this.props.mutate({
      variables: { id, credits }
    })
  }
  render(){ 
    return (
      <React.Fragment>
        <Box direction="row" gap="small" width="small" align="center">
        <TextInput value={this.state.credits} onChange={this.handleChange}/> 
              <Button onClick={this.handleSubmit}>
                  <Update />
               </Button>
        </Box>
      </React.Fragment>
    )
  }
}

const MutatedInputBox = graphql(assignCredits)(InputBox)

class UserTable extends React.Component {
    render() {
      console.log(this.props)
      let { data } = this.props
      return(
        <React.Fragment>
        <Box fill>
        <Table>
        <TableHeader>
          <TableRow>
            <TableCell>
              <Text>FullName</Text>
            </TableCell>
            <TableCell>
              <Text>Username</Text>
            </TableCell>
            <TableCell>
              <Text>Mobile</Text>
            </TableCell>
            <TableCell>
              <Text>Credits</Text>
            </TableCell>
            <TableCell >
                <Text> Update Credits </Text>
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data ? data.map((item,index)=>( 
          <TableRow key={index}>
          <TableCell>
            {item.fullname}
          </TableCell>
          <TableCell>
            {item.username}
          </TableCell>
          <TableCell>
            {item.mobile}
          </TableCell>
          <TableCell>
            {item.credits}
          </TableCell>
          <TableCell>
            <MutatedInputBox user_id={item.id} />
          </TableCell>
          </TableRow>
          )
          ): ''}
        </TableBody>
        </Table>
        </Box>
        </React.Fragment>
        )
    }
}

class ManageUserCredits extends React.Component {
  constructor(props){
    super()
  }
  render() {
    let { data } = this.props
    if(data.loading) return 'Loading'
    return(
      <React.Fragment>
      <Box pad={{horizontal:"medium"}}>
      <Heading level={3}>
          Manage User Credits
      </Heading>
      <UserTable data={data.getAllUsers}/>
      </Box>
      </React.Fragment>
  )
  }
}

export default graphql(getAllUsers)(ManageUserCredits)
