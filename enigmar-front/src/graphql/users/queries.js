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

export {GET_USUARIOS};
