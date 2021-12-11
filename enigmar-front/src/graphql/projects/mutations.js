import { gql } from '@apollo/client';

const EDITAR_PROYECTO = gql `
mutation Mutation($id: String!, $status: String!) {
    projectUpdateStatus(_id: $id, status: $status) {
      status
    }
  }
    
`;

export {EDITAR_PROYECTO};