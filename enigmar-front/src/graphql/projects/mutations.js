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

export {EDITAR_PROYECTO_ESTADO, EDITAR_PROYECTO_FASE};