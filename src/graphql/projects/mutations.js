import { gql } from '@apollo/client';

const EDITAR_PROYECTO_ESTADO = gql `
mutation Mutation($id: String!, $status: String!) {
    projectUpdateStatus(_id: $id, status: $status) {
      status
    }
  }
    
`;

const EDITAR_PROYECTO_FASE = gql `
mutation ProjectUpdatePhase($id: String!, $phase: Enum_phaseProject!) {
  projectUpdatePhase(_id: $id, phase: $phase) {
    phase
  }
}`;

const CREAR_PROYECTO = gql `
  mutation Mutation(
    $name: String!, 
    $generalObjective: String!, 
    $specificObjectives: [String]!, 
    $budget: Float!, $startDate: Date!, 
    $endDate: Date!, $leader_id: String!
    ) {
    createProject(
      name: $name, 
      generalObjective: $generalObjective, 
      specificObjectives: $specificObjectives, 
      budget: $budget, 
      startDate: $startDate, 
      endDate: $endDate, 
      leader_id: $leader_id
      ) {
      _id
      name
      generalObjective
      specificObjectives
      budget
      startDate
      endDate
      leader_id {
        _id
      }
    }
  }
`;

const EDITAR_PROYECTO = gql `
  mutation Mutation(
    $id: String!, 
    $name: String, 
    $generalObjective: String, 
    $specificObjectives: [String], 
    $budget: Float) {
    projectUpdate(
      _id: $id, 
      name: $name, 
      generalObjective: $generalObjective, 
      specificObjectives: $specificObjectives, 
      budget: $budget) {
      _id
      name
      generalObjective
      specificObjectives
      budget
    }
  }
`;

export {EDITAR_PROYECTO_ESTADO, EDITAR_PROYECTO_FASE, CREAR_PROYECTO, EDITAR_PROYECTO};