import { gql } from '@apollo/client';

const APROBAR_INSCRIPCION = gql `
    mutation ApproveEnrollment(
        $approveEnrollmentId: String!) {
        approveEnrollment(id: $approveEnrollmentId) {
            status
    }
  }
  `;
  export {APROBAR_INSCRIPCION};