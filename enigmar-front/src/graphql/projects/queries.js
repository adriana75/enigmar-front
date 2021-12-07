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
        _id
        addDate
        description
        observations
      }
    }
  }
`;

export {GET_PROYECTOS};