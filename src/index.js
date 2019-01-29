import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes.jsx';
import client from './apolloclient/index'
import { ApolloProvider } from 'react-apollo'

const App =() => {
    return(
        <ApolloProvider client={client}>
            <Routes/>
        </ApolloProvider>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));
