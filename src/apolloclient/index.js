import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';

let uri = 'http://localhost:8000/graphql'
if(process.env.NODE_ENV === 'production'){
    uri = 'https://sattamatkabazaar.com/api/graphql'
}

const httpLink = new HttpLink({ uri })

const cache = new InMemoryCache();

const authMiddleware = new ApolloLink((operation,forward)=>{
    operation.setContext({
        headers: { authorization: localStorage.getItem('bid-admin-token') ? localStorage.getItem('bid-admin-token') : ''
        }   
    })
    return forward(operation)
})

const stateLink = withClientState({
    cache,
});

const client = new ApolloClient({
    cache,
    link: ApolloLink.from([
        authMiddleware, stateLink, httpLink
    ])
});

export default client


