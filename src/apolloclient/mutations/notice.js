const gql = require('graphql-tag')

const addNotice =  gql`
mutation AddNotice($text:String){
	addNotice(text:$text){
    id
  }
}
`

export {
    addNotice
}