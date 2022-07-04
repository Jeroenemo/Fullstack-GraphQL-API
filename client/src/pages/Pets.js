import React, {useState} from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'

const ALL_PETS = gql`
    query AllPets { 
      pets {
        id
        name 
        type  
        img
      }
    }
  `

const ADD_PET = gql`
  mutation AddPet($petInput: NewPetInput!) {
    addPet(input: $petInput) { 
      id 
      name 
      type 
      img
    }
  }
`

export default function Pets () {
  const [modal, setModal] = useState(false)
  const { data, loading, error } = useQuery(ALL_PETS);
  const [createPet, newPet] = useMutation(ADD_PET, {
    update(cache, {data: {addPet}}) {
      const data = cache.readQuery({query: ALL_PETS}) 
      cache.writeQuery({
        query: ALL_PETS,
        data: {pets: [addPet, ...data.pets]}
      }) 
    },  
    //Global, will happen every time createPet is invoked
    //No access to variables
    optimisticResponse: {}
  });

  const onSubmit = input => {
    setModal(false) 
    console.log(input.name)
    createPet({  
      variables: {petInput: input}, 
      //Will only happen once 
      //Does have access to varaibles
      optimisticResponse: { 
        __typename: 'Mutation', 
        Pet: {
          __typename: 'Pet', 
          id: Date.now(), 
          name: input.name, 
          type: input.type, 
          img: 'https://via.placeholder.com/300'
        }
      }
    })
  }

  if (loading) {
    return <Loader />
  } 

  if (error || newPet.error) { 
    return <p>{error}</p>
  }
  
  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={data.pets}/>
      </section>
    </div>
  )
}
