import { gql } from '@apollo/client';

const EDITAR_USUARIO = gql `
    mutation Mutation(
        $id: String!, 
        $name: String!, 
        $lastName: String!, 
        $email: String!, 
        $status: Enum_statusUser!, 
        ) {
        userUpdate(
            _id: $id, 
            name: $name, 
            lastName: $lastName, 
            email: $email, 
            status: $status, 
        ) {
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

export {EDITAR_USUARIO};