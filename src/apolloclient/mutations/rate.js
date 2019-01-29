const gql = require('graphql-tag')

const addRate = gql`
mutation AddRate($name:String, $rate:String){
    addRate(name:$name, rate:$rate){
          id
    }
  }
`
const updateRate = gql`
mutation UpdateRate($id:ID, $rate:String){
    updateRate(id:$id, rate:$rate){
          id, rate, name
    }
}
`

const removeRate = gql`
mutation RemoveRate($id:ID){
    removeRate(id:$id)
  }
`

export {
    addRate,
    updateRate,
    removeRate
}