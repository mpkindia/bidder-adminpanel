const gql = require('graphql-tag')

const toggleUser = gql`
    mutation ToggleUser($id:ID) {
        toggleUser(id:$id){
            id, active
        }
    }
`
const assignCredits = gql`
mutation AssignCredits($id:ID, $credits:Float){
    assignCredits(id:$id,credits:$credits
    ){
      id, credits
    }
  }
`
export { toggleUser, assignCredits }