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
  query Query($_id: String!) {
    Project(_id: $_id) {
      _id
      name
      generalObjective
      specificObjectives
      budget
    }
  }
`;

export {GET_PROYECTOS, GET_PROJECT};