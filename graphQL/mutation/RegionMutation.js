import { gql } from "@apollo/client";

export const CREATE_REGION = gql`
  mutation CreateRegion($input: AddRegionRequestDtoInput!) {
    createRegion(input: $input) {
      code
      
    }
  }
`;
export const UPDATE_REGION = gql`
  mutation UpdateRegion($id: UUID!, $input: UpdateRegionRequestDtoInput!) {
    updateRegion(id: $id, input: $input) {
      code
    }
  }
`;
export const DELETE_REGION = gql`
  mutation DeleteRegion($id: UUID!) {
    deleteRegion(id: $id) 
  }
`;