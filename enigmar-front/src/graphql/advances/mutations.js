import { gql } from '@apollo/client';

const EDITAR_AVANCES = gql `
mutation Mutation(
  $id: String!, 
  $observations: String!, 
  $description: String!) {
  advanceUpdate(
    _id: $id, 
    observations: $observations, 
    description: $description
    ) {
    description
    observations
    _id
  }
}
`;

export {EDITAR_AVANCES};