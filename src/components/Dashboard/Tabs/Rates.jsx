import React from 'react'
import { Heading, Box, Table, Text, TableHeader, TableRow, TableCell, TableBody, Button, CheckBox, TextInput, Layer, FormField} from 'grommet'
import { Update, Trash as Remove } from 'grommet-icons'
import { getAllRates } from '../../../apolloclient/queries/rate'
import { updateRate, addRate, removeRate } from '../../../apolloclient/mutations/rate'
import { graphql } from 'react-apollo'

class AddGame extends React.Component {
  constructor(props){
      super()
      this.state = {
          name: '',
          rate: ''
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e) {
      let { name, value } = e.target
      this.setState({
          [name]: value
      })
  }
  async handleSubmit() {  
      let { name, rate } = this.state
      await this.props.mutate({
          variables: { 
              name, rate
          },
          refetchQueries: [
              { query: getAllRates }
          ]
      })
      this.props.close()
  }
  render() {
      const close = this.props.close
      return(
          <Layer onClickOutside={close} onEsc={close}>
              <Box pad={{vertical:"small", horizontal:"medium"}}>
                  <Heading level="4">
                      Add Game Type
                  </Heading>
                  <Box>
                  <FormField label="Name">
                      <TextInput onChange={this.handleChange} name="name" value={this.state.name}/>
                  </FormField>
                  <FormField label="Rate">
                      <TextInput onChange={this.handleChange} name="rate" value={this.state.rate}/>
                  </FormField>
                  <Button primary alignSelf="center" onClick={this.handleSubmit} >
                  <Box pad={{horizontal: "medium"}}>
                      Add Game Type 
                  </Box>
                  </Button>
                  </Box>
              </Box>
          </Layer>
      )    
  }
}
const AddLayer = graphql(addRate)(AddGame)

class InputBox extends React.Component {
  constructor(props){
    super()
    this.state = {
       rate: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  } 
  handleChange(e){
    let value = e.target.value
    this.setState({ rate: value })
  }
  async handleSubmit(){
    let id = this.props.game_id
    let rate = this.state.rate
    console.log(id)
    await this.props.mutate({
      variables: { id, rate }
    })
    this.setState({ rate: '' })
    console.log(rate)
  }
  render(){ 

    return (
      <React.Fragment>
        <Box direction="row" gap="small" width="small" align="center">
        <TextInput value={this.state.rate} onChange={this.handleChange}/> 
              <Button onClick={this.handleSubmit}>
                  <Update />
               </Button>
        </Box>
      </React.Fragment>
    )
  }
}
const MutatedInputBox = graphql(updateRate)(InputBox)

class DeleteGameType extends React.Component{
  async handleDeletion() {
    console.log(this.props.game_id)
    let id = this.props.game_id
    await this.props.mutate({
      variables:{
        id
      }, refetchQueries:[{
        query: getAllRates
      }]
    })
  }
  render(){
    return(
      <React.Fragment>
          <Button onClick={this.handleDeletion.bind(this)} >
          <Remove />
          </Button>
      </React.Fragment>
    )  
  }
}
const DeleteRowBox = graphql(removeRate)(DeleteGameType)

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
            <Text>Game Type</Text>
          </TableCell>
          <TableCell>
            <Text>Current Rate</Text>
          </TableCell>
          <TableCell >
              <Text> Update Game Rate </Text>
          </TableCell>
          <TableCell>
            <Text>Delete GameType </Text>
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data ? data.map((item,index)=>( 
        <TableRow key={index}>
        <TableCell>
          {item.name}
        </TableCell>
        <TableCell>
          {item.rate}
        </TableCell>
        <TableCell>
          <MutatedInputBox game_id={item.id} />
        </TableCell>
        <TableCell align="center">
          <DeleteRowBox game_id={item.id} />
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

class ManageGameRates extends React.Component {
  constructor(props){
    super()
    this.state = {
      addModal : false
    }
    this.addModalActive = this.addModalActive.bind(this)
  }
  addModalActive (){
    this.setState({
      addModal: true
    })
  }
  render() {
    let { data } = this.props
    if(data.loading) return 'Loading'
    // console.log(data.getAllRates)
    return(
      <React.Fragment>
      {this.state.addModal && <AddLayer close={()=>this.setState({ addModal: false })}/>}
      <Box pad={{horizontal:"medium"}}>
      <Heading level={3}>
          Manage Game Rates
      </Heading>
      <UserTable data={data.getAllRates} />
      </Box>
      <Box direction="row-responsive" gap="medium" pad={{vertical:"large", horizontal:"medium"}}>
            <Box background="brand" pad="small">
            <Button onClick={this.addModalActive} >
                Add Game Type
            </Button>
            </Box>
            {/* <Box background="brand" pad="small">
            <Button onClick={this.removeModalActive} >
                Remove Bazaar
            </Button>
            </Box> */}

            </Box>
      </React.Fragment>
  )
  }
}

export default graphql(getAllRates)(ManageGameRates)
