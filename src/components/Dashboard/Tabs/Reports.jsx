import { Box, Button, Calendar, DataTable, DropButton, Heading, Text } from 'grommet';
import { FormDown } from 'grommet-icons';
import React from 'react';
import { graphql } from 'react-apollo';
import { getAllBids } from '../../../apolloclient/queries/bid';

const compare = (arr1,arr2) => {
  let flag = true;
  if(arr1[0]!==arr2[0])
  {    flag = false
        return flag;
  }
  else if(arr1[1]!==arr2[1])  
  {    flag = false
    return flag;
  }
 else if(arr1[2]!==arr2[2])  
 {    flag = false
  return flag;
 }
  return flag
}

const convertMonth = (month) => {
  if(month==='12') return "Dec"
  else if (month==='11') return "Nov"
  else if (month==='10') return "Oct"
  else if (month==='09') return "Sep"
  else if (month==='08') return "Aug"
  else if (month==='07') return "Jul"
  else if (month==='06') return "Jun"
  else if (month==='05') return "May"
  else if (month==='04') return "Apr"
  else if (month==='03') return "Mar"
  else if (month==='02') return "Feb"
  else if (month==='01') return "Jan"
}

class CalendarDropButton extends React.Component {
  state = { date: undefined };

  onClose = () => {
    this.setState({ open: false });
    setTimeout(() => this.setState({ open: undefined }), 1);
  };

  onSelect = date => {
    this.setState({ open: false })
    this.props.selectDate(date)
}

  render() {
    const { open } = this.state
    let date = this.props.date
    return (
        <Box pad="small"  direction="row" justify="between" >
        <Box align="center">
          <DropButton
            open={open}
            onClose={() => this.setState({ open: false })}
            onOpen={() => this.setState({ open: true })}
            dropContent={<Calendar date={date} onSelect={this.onSelect} />}
          >
            <Box direction="row" gap="medium" align="center" pad="small" >
              <Text>
                {date ? new Date(date).toLocaleDateString() : "Select date"}
              </Text>
              <FormDown color="brand" />
            </Box>
          </DropButton></Box>
          <Button onClick={()=>this.props.selectDate(null)}>
          <Box background="brand" pad={{horizontal:'small', vertical:'xsmall'}}>
            Reset
            </Box>
          </Button>
        </Box>
    );
  }
}

const columns = [
  {
    property: "bazaar_name",
    header: <Text>Bazaar Name</Text>,
    primary: true,
  },
  {
    property: "user_name",
    header: <Text>Username</Text>
  },
  {
    property: "bazaar_type",
    header: <Text>Bazaar Type</Text>
  },
  {
    property: "bid_type",
    header: <Text>Bid Type</Text>
  },
  {
    property: "bid_number",
    header: <Text>Bid Value</Text>
  },
  {
    property: "bid_value",
    header: <Text>Bid Value</Text>
  },
  {
    property: "created_at",
    header: <Text>Time</Text>,
    render: ({created_at}) => created_at.split('GMT')[0]
  }
];

const controlledColumns = columns.map(col => Object.assign({}, col));

class ControlledDataTable extends React.Component {
    getBids(date, data) {
    let arr = [];
    if(!date) return data
    if(!data ) return []
    let inputSplit = date.split('T')[0].split('-')
    inputSplit[1] = convertMonth(inputSplit[1])
    console.log(inputSplit)
    data.map((item)=>{
      let splited = item['created_at'].split(' ')
      splited[0] = splited[3]
      splited.splice(3)
      if(compare(inputSplit, splited))
      arr.push(item)
    })
    return arr
  }


  render() {
    let date = this.props.date
    if (this.props.loading) return "loading..."
    console.log(this.props.data.getAllBids)
    return (
        <Box align="center" pad="medium">
          <DataTable
            columns={[
              ...controlledColumns
            ].map(col => ({ ...col }))}
            data={this.getBids(date, this.props.data.getAllBids)}
            sortable
            size="medium"
          />
        </Box>
    );
  }
}
const DataTableWithData = graphql(getAllBids)(ControlledDataTable)


export default class Reports extends React.Component {
  state={
    date: null
  }
  render() {
    return(
      <React.Fragment>
      <Heading level={3}>
          Reports
      </Heading>
      <CalendarDropButton date={this.state.date} selectDate={(date)=>this.setState({date})}/>
      <Box  pad="small">
          <DataTableWithData date={this.state.date}/>
      </Box>
      </React.Fragment>
  )
  }
}
