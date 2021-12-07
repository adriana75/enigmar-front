import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/usuarios/Index' 
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

//const httpLink = createHttpLink({
//  uri: "http://localhost:4000/graphql"
//})

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Index />}/>
        </Routes>
      </BrowserRouter>
    </ApolloProvider> 
  );
}

export default App;
