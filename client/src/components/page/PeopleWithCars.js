import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { Button, Card } from 'antd'
import People from '../lists/People'
import { useQuery } from '@apollo/client'
import { GET_PERSON_WITH_CARS , GET_CARS, GET_PEOPLE} from '../../queries'

import { Routes, Route, useParams, Link } from 'react-router-dom';

// import './App.css'
const getStyles = () => ({
    card: {
      width: '500px'
    }
  })

// const client = new ApolloClient({
//   uri: 'http://localhost:4000/graphql',
//   cache: new InMemoryCache()
// })

const PeopleWithCars = () => {
    const styles = getStyles()

    let { personId } = useParams();

    
    // const { loading1, error1, data1 } = useQuery(GET_PERSON_WITH_CARS,  {
    //     variables: {personId}
    //   })
    // if (loading1) return 'Loading...'
    // if (error1) return `Error! ${error.message}`


    // const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS)
    // if (loading) return 'Loading...'
    // if (error) return `Error! ${error.message}`


    const { loading, error, data } = useQuery(GET_PEOPLE, {variables:{id:personId}})
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`


    // const { loading2, error2, data2 } = useQuery(GET_CARS, {variables:{personId:personId}})
    // if (loading2) return 'Loading...'
    // if (error2) return `Error! ${error.message}`

    console.log(`data1: ${data.people}`);
    // console.log(`data2: ${data2}`);
    

  return (
    // <ApolloProvider client={client}>
      <div className='People'>
    <h1>Person ID : {personId}</h1>
    <Card
          style={styles.card}
     >
         
        </Card>
      <Link to={`/`}>GO BACK HOME</Link>
      </div>
    // </ApolloProvider>
  )
}

export default PeopleWithCars
