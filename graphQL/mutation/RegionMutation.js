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


export const REGION_CREATED_SUBSCRIPTION = gql`
  subscription {
    onRegionCreated {
      id
      name
      code
      regionImageUrl
    }
  }
`;
export const SIMPLE_TRIGGER_SUBSCRIPTION = gql`
  subscription {
    onSimpleTrigger 
      
  }
`;

export const SIMPLE_TRIGGER_MUTATION = gql`
  mutation SimpleTrigger {
      triggerSimpleEvent
  }
`;