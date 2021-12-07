import { gql } from "@apollo/client";

const GET_INSCRIPCIONES = gql `
  query Query {
      Enrollments {
        _id
        project_id
        user_id
        status
        enrollmentDate
        egressDate
      }
    }
`;

export {GET_INSCRIPCIONES};