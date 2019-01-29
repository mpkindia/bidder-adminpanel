import React from 'react'
import { Heading, Box, Table, Text, TableHeader, TableRow, 
            TableCell, TableBody, Button, CheckBox, TextInput } from 'grommet'
import { Update } from 'grommet-icons'
import { getAllBazaars } from '../../../apolloclient/queries/bazaar'
import { bazaarResult } from '../../../apolloclient/mutations/bazaar'
import { graphql } from 'react-apollo'


class UpdateResult extends React.Component {
    constructor(props){
        super()
        this.state = {
            result: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      } 
      handleChange(e){
        let value = e.target.value
        this.setState({ result: value })
      }
      async handleSubmit(){
        let id = this.props.user_id
        let result = this.state.result
        await this.props.mutate({
          variables: { id, result },
          refetchQueries: [ 
              {query: getAllBazaars }
         ]
        })
      }
      render(){ 
        return (
          <React.Fragment>
            <Box direction="row" gap="small" width="small" align="center">
            <TextInput value={this.state.result} onChange={this.handleChange}/> 
                  <Button onClick={this.handleSubmit}>
                      <Update />
                   </Button>
            </Box>
          </React.Fragment>
        )
      }
}
 
const MutateResult = graphql(bazaarResult)(UpdateResult)
class UserTable extends React.Component {
    // constructor(props){
    //     super()
        
    // }
    render() {
        console.log(this.props.data)
        let { data } = this.props
        return(
        <React.Fragment>
        <Box fill>
        <Table>
        <TableHeader>
          <TableRow>
              <TableCell >
                <Text> Bazaar Name </Text>
              </TableCell>
              <TableCell >
                <Text> Open Time</Text>
              </TableCell>
              <TableCell >
                <Text> Close Time </Text>
              </TableCell>
              <TableCell >
                <Text> Current Result </Text>
              </TableCell>

            <TableCell >
                <Text> Update Result </Text>
            </TableCell>
          </TableRow>
        </TableHeader>
        {/* body  */}
        <TableBody>
            {data ? data.map((item,index)=>
                <TableRow key={index}>
                    <TableCell >
                    <Text>
                        {item.name}
                    </Text>
                    </TableCell>
                    <TableCell >
                    <Text>
                        {item.open_time}
                    </Text>
                    </TableCell>
                    <TableCell >
                    <Text>
                        {item.close_time}
                    </Text>
                    </TableCell>
                    <TableCell >
                    <Text>
                        {item.result}
                    </Text>
                    </TableCell>
                    <TableCell >
                        <MutateResult user_id={item.id}/>
                    </TableCell>
                </TableRow>
            ): ''}
        </TableBody>
        </Table>
        </Box>
        </React.Fragment>
        )
    }
}

const Results = ({ data }) => {
    if (data.loading) return <p>Loading</p>
    return(
        <React.Fragment>
        <Box pad={{horizontal:"medium"}}>
        <Heading level={3}>
            Game Results
        </Heading>
        <UserTable data={data.getAllBazaars} />
        </Box>
        </React.Fragment>
    )
}

export default graphql(getAllBazaars)(Results)
