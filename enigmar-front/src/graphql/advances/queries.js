import { gql } from "@apollo/client";

const GET_AVANCES = gql `
    query Query {
        Advances {
        _id
        project_id {
            _id
            name
        }
        addDate
        description
        observations
        }
    }
`;

export {GET_AVANCES};