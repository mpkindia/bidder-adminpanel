import React from 'react'
import { Heading, Box,  Button, TextArea, Layer, Text} from 'grommet'
import { Close } from 'grommet-icons'
import { graphql } from 'react-apollo'
import { addNotice } from '../../../apolloclient/mutations/notice';

const Preview = ({close, content}) => (
  <Layer onEsc={close} onClickOutside={close}>
  <Box pad="medium" style={{minHeight:'50vh', minWidth:'40vw'}}>
    <Box direction="row" gap="medium" justify="between" >
    <Text as='h1' >
    Notice Preview  
    </Text>
    <Button onClick={close}>
    <Close /></Button>
    </Box>
    <Text>
      {content.split('<>').map(item=>(<React.Fragment><Text>{item}</Text><br/></React.Fragment>))}
    </Text>
  </Box>
  </Layer>
)

class NoticeBoard extends React.Component {
  constructor(props){
    super()
    this.state = {
        text: '',
        preview: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e) {
    let { value } = e.target
    this.setState({
        text: value
    })
}
  async handleSubmit () {
    let { text } = this.state
    let id = await this.props.mutate({
      variables: { text }
    })
    console.log(id)
    this.setState({text:''})
  }
  render() {
    return(
      <React.Fragment>
        {this.state.preview && <Preview content={this.state.text} close={()=>this.setState({preview:false})} />}
      <Box pad={{horizontal:"medium"}}>
      <Heading level={3}>
          Manage Notice Board
      </Heading>
      <Text>Note: Use {`<>`} to add a line break  </Text>

      <Box height="medium">
      <TextArea value={this.state.text} 
                onChange={this.handleChange}
                fill
        />
    </Box>
    <Box direction="row">
      <Button onClick={()=> this.setState({ preview: true })}>
      <Box background="brand" pad="small" width="xsmall" margin="small" align="center">
                Preview 
        </Box>
      </Button>
      <Button onClick={this.handleSubmit} >
      <Box background="brand" pad="small" width="xsmall" margin="small" align="center">
                Submit 
        </Box>
        </Button>
        </Box>
      </Box>
      </React.Fragment>
  )
  }
}

export default graphql(addNotice)(NoticeBoard)
