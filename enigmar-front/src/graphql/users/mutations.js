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

const CREAR_USUARIO = gql `
    mutation Mutation(
        $email: String!, 
        $documentId: String!, 
        $name: String!, 
        $lastName: String!, 
        $role: Enum_Role!, 
        $password: String!, 
        $status: Enum_statusUser) {
        inputUser(
            email: $email, 
            documentId: $documentId, 
            name: $name, 
            lastName: $lastName, 
            role: $role, 
            password: $password, 
            status: $status) {
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

export {EDITAR_USUARIO, CREAR_USUARIO};