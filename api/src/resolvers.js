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
    pets(_, {input}, ctx) {
      return ctx.models.Pet.findMany(input || {})
    },
    pet(_, {id}, ctx) {
      console.log('Query => Pet')
      return ctx.models.Pet.findOne({id})
    }
  },
  Mutation: {
    addPet(_, {input}, ctx) {
      const pet = ctx.models.Pet.create(input)
      return pet
    }
  },
  Pet: {
    owner(_, __, ctx) { 
      console.log('PET => owner')
      return ctx.models.User.findOne() 
    },
    img(pet) {
      return pet.type === 'DOG'
        ? 'https://placedog.net/300/300'
        : 'http://placekitten.com/300/300'
    }
  },
  User: {
    pets(_, __, ctx) { 
      console.log('owner => pets')
      return ctx.models.Pet.findMany()
    }
  }
}
