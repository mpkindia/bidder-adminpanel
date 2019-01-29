const gql = require('graphql-tag')

const getAllBids = gql`
    query {
        getAllBids {
            user_name, bazaar_name, bid_type, bid_value, bid_number,
             bazaar_type,created_at
        }
    }
`


export { getAllBids };
