import { gql } from '@apollo/client';

const GET_PROYECTOS = gql `
  query Query {
    Projects {
      _id
      name
      generalObjective
      specificObjectives
      budget
      startDate
      endDate
      leader_id {
        _id
        name
        lastName
        role
      }
      status
      phase
      advances {
        description
        observations
      }
    }
  }
`;

const GET_PROJECT = gql `
  query Query($id: String!) {
    Project(_id: $id) {
      _id
      name
    }
  }
`;

export {GET_PROYECTOS, GET_PROJECT};