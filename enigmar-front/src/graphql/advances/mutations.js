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

const CREAR_AVANCE = gql`
  mutation Mutation(
    $project_id: String!, 
    $addDate: Date!, 
    $description: String!, 
    $observations: String) {
    inputAdvance(
      project_id: $project_id, 
      addDate: $addDate, 
      description: $description, 
      observations: $observations) {
      _id
      project_id {
        _id
      }
      addDate
      description
      observations
    }
  }
`;

export {EDITAR_AVANCES, CREAR_AVANCE};