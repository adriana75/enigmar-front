import { gql } from "@apollo/client";

const GET_INSCRIPCIONES = gql `
  query Enrollments {
    Enrollments {
      _id
      project_id {
        _id
        name
      }
      user_id {
        _id
        name
      }
      status
      enrollmentDate
      egressDate
    }
  }
`;

export {GET_INSCRIPCIONES};