const gql = require('graphql-tag')

const getAllBazaars = gql`
query	{
	getAllBazaars{
    id, name, open_time, close_time, result, open_active, close_active
  }
}
`

export {
    getAllBazaars
}