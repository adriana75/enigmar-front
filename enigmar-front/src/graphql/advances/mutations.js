import { gql } from '@apollo/client';

const EDITAR_AVANCES = gql `
mutation Mutation(
    $id: String!, 
    $description: String!) {
    advanceUpdateDescription(
        _id: $id, 
        description: $description
    ) {
      description
    }
  }
`;

export {EDITAR_AVANCES};