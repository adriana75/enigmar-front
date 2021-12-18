import { gql } from '@apollo/client';

const APROBAR_INSCRIPCION = gql `
    mutation ApproveEnrollment(
        $approveEnrollmentId: String!) {
        approveEnrollment(id: $approveEnrollmentId) {
            status
    }
  }
  `;

const CREAR_INSCRIPCIÓN = gql`
    mutation Mutation(
        $project_id: String!, 
        $user_id: String!) {
        inputEnrollment(
            project_id: $project_id, 
            user_id: $user_id) {
        _id
        enrollmentDate
        egressDate
        }
    }
`;
  export {APROBAR_INSCRIPCION, CREAR_INSCRIPCIÓN};