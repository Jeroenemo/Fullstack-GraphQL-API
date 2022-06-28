const { gql } = require('apollo-server')

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }
  type Pet {
    id: ID!
    createdAt: String!
    name: String!
    type: String!
  }
  input PetInput {
    name: String
    type: String
  }
  input NewPetInput {
    name: String!
    type: String!
  }
  type Query {
    pets(input: PetInput): [Pet]!
    pet(id: ID!): Pet!
  }
  type Mutation {
    addPet(input: NewPetInput!): Pet!
  }
`;

module.exports = typeDefs