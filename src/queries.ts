import {gql } from '@apollo/client';

export const GET_COUNTRIES = gql`
    query Countries{
        countries {
            name
            languages{
                name
            }
            currency
            continent {
                name
            }
        }
    }
`;

export const GET_COUNTRY = gql`
    query Country($code: ID!) {
        country(code: $code) {
            name
            native
            capital
            emoji
            currency
            languages {
                code
                name
            }
        }
    }
`;