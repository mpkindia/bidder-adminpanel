const gql = require('graphql-tag')

const bazaarResult = gql`
    mutation BazaarResult($id:ID, $result:String){
        bazaarResult(id:$id, result:$result){
                id
    }  
    }
`

const toggleOpenBazaar = gql`
mutation ToggleOpenBazaar($id:ID) {
    toggleOpenBazaar(id:$id){
        id, open_active
    }
}
`
const toggleCloseBazaar = gql`
mutation ToggleCloseBazaar($id:ID) {
    toggleCloseBazaar(id:$id){
        id, close_active
    }
}
`

const addBazaar = gql`
    mutation AddBazaar($name:String!, $open_time:String!, $close_time:String!){
        addBazaar(name:$name, open_time:$open_time, close_time:$close_time){
            id
        }
    }
`
// const editBazaar = gql`

// `

const removeBazaar = gql`
mutation RemoveBazaar($id:ID){
    removeBazaar(id:$id)
  }
`
export { 
    bazaarResult, addBazaar, toggleOpenBazaar, toggleCloseBazaar,
    removeBazaar, 
    // editBazaar
}