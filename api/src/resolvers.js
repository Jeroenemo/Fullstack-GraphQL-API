/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    //1st is initial value. Since this field exists on a query object, nothing resolves before it. 
    //2nd are the arguments that a client can pass
    //3rd is context object. This is shared amongst all resolvers. Defined in server.js
    //4th is AST of incoming query
    pets(_, __, ctx) {
      return ctx.models.Pet.findMany()
    }
  },
  // Mutation: {
    
  // },
  // Pet: {
  //   img(pet) {
  //     return pet.type === 'DOG'
  //       ? 'https://placedog.net/300/300'
  //       : 'http://placekitten.com/300/300'
  //   }
  // },
  // User: {
    
  //}
}
