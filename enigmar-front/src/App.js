import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexU from "./pages/users/IndexUsers";
import IndexP from "./pages/projects/IndexProjects";
import IndexE from "./pages/enrollments/IndexEnrollments";
import IndexA from "./pages/advances/IndexAdvances";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import UpdateUser from "./pages/users/UpdateUser";
import "bootstrap/dist/css/bootstrap.min.css";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/usuarios" element={<IndexU />} />
          <Route path="/proyectos" element={<IndexP />} />
          <Route path="/inscripciones" element={<IndexE />} />
          <Route path="/avances" element={<IndexA />} />
          <Route path="/usuarios/editar/:_id" element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
