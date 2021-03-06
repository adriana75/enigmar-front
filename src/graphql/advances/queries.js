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

const GET_ADVANCE = gql `
    query Query($id: String!) {
        Advance(_id: $id) {
        _id
        addDate
        description
        observations
        }
    }
`;

const GET_ADVANCEP = gql `
    query Query($projectId: String!) {
        AdvanceP(project_id: $projectId) {
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

export {GET_AVANCES, GET_ADVANCE, GET_ADVANCEP};