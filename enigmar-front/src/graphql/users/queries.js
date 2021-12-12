import { gql } from "@apollo/client";

const GET_USUARIOS = gql `
    query Query {
        Users {
        _id
        email
        documentId
        name
        lastName
        fullName
        role
        status
        password
        }

        Students {
            _id
            email
            documentId
            name
            lastName
            fullName
            role
            status
            password
        }

        Pending {
            _id
            email
            documentId
            name
            lastName
            role
            status
            password
        }
    }
`;

const GET_USUARIO = gql `
    query Query($_id: String!) {
        User(_id: $_id) {
        _id
        name
        lastName
        email
        status
        documentId
        role
        }
    }
`;

const GET_LIDER = gql `
query Query {
    LiderAut {
      _id  
      status
      role
      email
    }
  }
`;

export {GET_USUARIOS, GET_USUARIO, GET_LIDER};
