import { gql } from '@apollo/client';

const EDITAR_USUARIO = gql `
    mutation Mutation(
        $id: String!, 
        $email: String!, 
        $name: String!, 
        $lastName: String!, 
        $status: Enum_statusUser!, 
        $password: String!
        ) {
        userUpdate(
            _id: $id, 
            email: $email, 
            name: $name, 
            lastName: $lastName, 
            status: $status, 
            password: $password
        ) {
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
    }
`;

export {EDITAR_USUARIO};