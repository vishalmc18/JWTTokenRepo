import { gql } from "@apollo/client";


export const GET_REGIONS = gql`
query regions {
  regions {
    id
    name
   code
   regionImageUrl
  }
}
`;

export const GET_REGION_BY_ID = gql`
query regionById($id: UUID!) {
  regionById(id: $id) {
    id
    name
    code
    regionImageUrl
  }
}
`;