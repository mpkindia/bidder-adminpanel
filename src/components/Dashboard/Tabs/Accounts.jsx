import React from 'react'
import { Heading, Box, Table, Text, TableHeader, TableRow, TableCell, TableBody, Button, CheckBox} from 'grommet'
import { getAllUsers } from '../../../apolloclient/queries/user'
import { toggleUser } from '../../../apolloclient/mutations/user'
import { graphql } from 'react-apollo'

const MCheckBox = ({ active, user_id, mutate }) => {
  console.log(active, user_id)
  return(
    <React.Fragment>
      <CheckBox toggle checked={active} onChange={()=>mutate({ variables: { id: user_id }}) }/>
    </React.Fragment>
  )
}
const ModifiedCheckBox = graphql(toggleUser)(MCheckBox)

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
              <Text>Status</Text>
            </TableCell>
            <TableCell >
                <Text> Activate/Deactivate </Text>
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data ?data.map((item,index)=>( 
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
            {item.active ? <Text>Active</Text> : <Text>Non-Active</Text>}
          </TableCell>
          <TableCell>
            <ModifiedCheckBox active={item.active} user_id={item.id}/>
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

class ManageUsers extends React.Component {
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
          Manage User Acounts
      </Heading>
      <UserTable data={data.getAllUsers}/>
      </Box>
      </React.Fragment>
  )
  }
}

export default graphql(getAllUsers)(ManageUsers)
