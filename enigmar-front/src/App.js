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
import UpdateAdvances from "./pages/advances/UpdateAdvances";
import InputProject from "./pages/projects/inputProject";
import InputAdvances from "./pages/advances/InputAdvance"
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

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
        <Navbar />
        <Routes>
          <Route path="/usuarios" element={<IndexU />} />
          <Route path="/proyectos" element={<IndexP />} />
          <Route path="/proyectos/crear" element={<InputProject />} />
          <Route path="/inscripciones" element={<IndexE />} />
          <Route path="/avances" element={<IndexA />} />
          <Route path="/avances/:_id" element={<IndexA />} />
          <Route path="/avances/crear/:_id" element={<InputAdvances />} />
          <Route path="/usuarios/editar/:_id" element={<UpdateUser />} />
          <Route path="/avances/editar/:_id" element={<UpdateAdvances />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
