import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($userName: String!, $password: String!) {
  login(loginRequestDto:{
        userName: $userName,
        password: $password
  }){
    jwtToken      
  }
}`;