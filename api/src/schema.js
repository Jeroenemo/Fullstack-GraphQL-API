const { gql } = require('apollo-server')

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql` 
  enum PetType {
    CAT
    DOG
  }
  type User {
    id: ID!
    username: String!
    pets: [Pet]!
  }
  type Pet {
    id: ID!
    createdAt: String!
    name: String!
    type: String! 
    owner: User!
  }
  input PetInput {
    name: String
    type: String
  }
  input NewPetInput {
    name: String!
    type: PetType!
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