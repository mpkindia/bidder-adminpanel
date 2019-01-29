import React from 'react'
import { Heading, Box, Text, Table, TableHeader, TableRow, TableBody, TableCell, Button, Layer, TextInput, FormField,CheckBox } from 'grommet'
import { getAllBazaars } from '../../../apolloclient/queries/bazaar'
import { graphql } from 'react-apollo'
import { addBazaar, toggleOpenBazaar, toggleCloseBazaar, removeBazaar } from '../../../apolloclient/mutations/bazaar'
import { Trash as Remove } from 'grommet-icons'

const OCheckBox = ({ open_active, bazaar_id, mutate }) => {
    console.log(open_active, bazaar_id)
    return(
      <React.Fragment>
        <CheckBox toggle checked={open_active} onChange={()=>mutate({ variables: { id: bazaar_id }}) }/>
      </React.Fragment>
    )
}
  const ModifiedOpenCheckBox = graphql(toggleOpenBazaar)(OCheckBox)
  
  const CCheckBox = ({ close_active, bazaar_id, mutate }) => {
    console.log(close_active, bazaar_id)
    return(
      <React.Fragment>
        <CheckBox toggle checked={close_active} onChange={()=>mutate({ variables: { id: bazaar_id }}) }/>
      </React.Fragment>
    )
  }
 const ModifiedCloseCheckBox = graphql(toggleCloseBazaar)(CCheckBox)

class AddLayer extends React.Component {
    constructor(props){
        super()
        this.state = {
            name: '',
            open_time: '',
            close_time: ''
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
        let { name, close_time, open_time } = this.state
        await this.props.mutate({
            variables: { 
                name, close_time, open_time
            },
            refetchQueries: [
                { query: getAllBazaars }
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
                        Add Bazaar
                    </Heading>
                    <Box>
                    <FormField label="Name">
                        <TextInput onChange={this.handleChange} name="name" value={this.state.name}/>
                    </FormField>
                    <FormField label="Open-Time">
                        <TextInput onChange={this.handleChange} name="open_time" value={this.state.open_time}/>
                    </FormField>
                    <FormField label="Close-Time">
                        <TextInput onChange={this.handleChange} name="close_time" value={this.state.close_time}/>
                    </FormField>
                    <Button primary alignSelf="center" onClick={this.handleSubmit} >
                    <Box pad={{horizontal: "medium"}}>
                        Add Bazaar 
                    </Box>
                    </Button>
                    </Box>
                </Box>
            </Layer>
        )    
    }
}
const AddLayerMutation = graphql(addBazaar)(AddLayer)

class RemoveLayer extends React.Component {
    constructor(props){
        super()
        this.state = {
            name: '',
            open_time: '',
            close_time: ''
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
    handleSubmit() {

    }
    render() {
        const close = this.props.close
        return(
            <Layer onClickOutside={close} onEsc={close}>
                <Box pad={{vertical:"small", horizontal:"medium"}}>
                    <Heading level="4">
                        Add Bazaar
                    </Heading>
                    <Box>
                    <FormField label="Name">
                        <TextInput onChange={this.handleChange} name="name" value={this.state.name}/>
                    </FormField>
                    <FormField label="Open-Time">
                        <TextInput onChange={this.handleChange} name="open_time" value={this.state.open_time}/>
                    </FormField>
                    <FormField label="Close-Time">
                        <TextInput onChange={this.handleChange} name="close_time" value={this.state.close_time}/>
                    </FormField>
                    <Button primary alignSelf="center" >
                    <Box pad={{horizontal: "medium"}}>
                        Add Bazaar 
                    </Box>
                    </Button>
                    </Box>
                </Box>
            </Layer>
        )    
    }
}
class EditLayer extends React.Component {
    constructor(props){
        super()
        this.state = {
            name: '',
            open_time: '',
            close_time: ''
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
    handleSubmit() {

    }
    render() {
        const close = this.props.close
        return(
            <Layer onClickOutside={close} onEsc={close}>
                <Box pad={{vertical:"small", horizontal:"medium"}}>
                    <Heading level="4">
                        Add Bazaar
                    </Heading>
                    <Box>
                    <FormField label="Name">
                        <TextInput onChange={this.handleChange} name="name" value={this.state.name}/>
                    </FormField>
                    <FormField label="Open-Time">
                        <TextInput onChange={this.handleChange} name="open_time" value={this.state.open_time}/>
                    </FormField>
                    <FormField label="Close-Time">
                        <TextInput onChange={this.handleChange} name="close_time" value={this.state.close_time}/>
                    </FormField>
                    <Button primary alignSelf="center" >
                    <Box pad={{horizontal: "medium"}}>
                        Add Bazaar 
                    </Box>
                    </Button>
                    </Box>
                </Box>
            </Layer>
        )    
    }
}

class DeleteBazaar extends React.Component{
    async handleDeletion() {
      console.log(this.props.bazaar_id)
      let id = this.props.bazaar_id
      await this.props.mutate({
        variables:{
          id
        }, refetchQueries:[{
          query: getAllBazaars
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
  const DeleteRowBox = graphql(removeBazaar)(DeleteBazaar)

class Bazaar extends React.Component {
    constructor(props){
        super()
        this.state = { 
            addModal: false,
            editModal: false,
            removeModal: false
        }
        this.addModalActive = this.addModalActive.bind(this)
        this.editModalActive = this.editModalActive.bind(this)
        this.removeModalActive = this.removeModalActive.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }
    addModalActive () {
        this.setState({
            addModal: true
        })
    }
    editModalActive() {
        this.setState({
            editModal: true
        })
    }
    removeModalActive () {
        this.setState({
            removeModal: true
        })
    }
    handleClose () {
        this.setState({
            addModal: false, removeModal: false, editModal: false
        })
    }
    render() {
    let { loading } = this.props.data
    if(loading) return <Text> Loading </Text>
    console.log(this.props.data)
    return(
        <React.Fragment>
        {this.state.addModal && <AddLayerMutation close={this.handleClose} />}
        {this.state.removeModal && <RemoveLayer close={this.handleClose} />}
        {this.state.editModal && <EditLayer close={this.handleClose} />}
        <Box pad="small">
        <Heading level={3}>
            Manage Bazaars
        </Heading>
        <Box>
        <Table >
        <TableHeader>
            <TableRow>
                <TableCell>
                    Name
                </TableCell>
                <TableCell>
                    Open-Time
                </TableCell>
                <TableCell>
                    Close-Time
                </TableCell>
                <TableCell>
                    Open Bazaar
                </TableCell>
                <TableCell>
                    Close Bazaar 
                </TableCell>
                <TableCell>
                    Remove Bazaar 
                </TableCell>
            </TableRow>
        </TableHeader>
        <TableBody>
        {this.props.data.getAllBazaars ? this.props.data.getAllBazaars.map((item, index)=>(
            <TableRow key={index}>
            <TableCell>
                {item.name}
            </TableCell>
            <TableCell>
                {item.open_time}
            </TableCell>
            <TableCell>
            {item.close_time}
            </TableCell>
            <TableCell>
                <ModifiedOpenCheckBox open_active={item.open_active} bazaar_id={item.id}/>
            </TableCell>
            <TableCell>
                <ModifiedCloseCheckBox close_active={item.close_active} bazaar_id={item.id}/>
            </TableCell>
            <TableCell align="center">
                <DeleteRowBox bazaar_id={item.id} />
            </TableCell>
        </TableRow>
        )
        ): ''}
        </TableBody>
        </Table>
        </Box>
            <Box direction="row-responsive" gap="medium" pad={{vertical:"large", horizontal:"small"}}>
            <Box background="brand" pad="small">
            <Button onClick={this.addModalActive} >
                Add Bazaar
            </Button>
            </Box>
            <Box background="brand" pad="small">
            <Button onClick={this.editModalActive} >
                Edit Bazaar
            </Button>
            </Box>
            <Box background="brand" pad="small">
            <Button onClick={this.removeModalActive} >
                Remove Bazaar
            </Button>
            </Box>
            </Box>
            </Box>
        </React.Fragment>

)
}}

export default graphql(getAllBazaars)(Bazaar)