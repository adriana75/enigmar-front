import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexU from './pages/users/IndexUsers' 
import IndexP from './pages/projects/IndexProjects'
import IndexE from './pages/enrollments/IndexEnrollments'
import IndexA from './pages/advances/IndexAdvances'
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
          <Route path='' element={<IndexU />}/>
        </Routes>
      </BrowserRouter>
    </ApolloProvider> 
  );
}

export default App;
