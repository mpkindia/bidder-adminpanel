const gql = require('graphql-tag')

const getAllUsers = gql`
    query	{
        getAllUsers{
            id, fullname, username, mobile, active, credits
    }
    }
`

export { 
    getAllUsers
}