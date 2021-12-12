import { gql } from '@apollo/client';

const APROBAR_INSCRIPCION = gql `
    mutation ApproveEnrollment(
        $approveEnrollmentId: String!) {
        approveEnrollment(id: $approveEnrollmentId) {
            project_id {
                name
            }
            user_id {
                name
            }
            status
            enrollmentDate
            egressDate
    }
  }
  `;
  export {APROBAR_INSCRIPCION};