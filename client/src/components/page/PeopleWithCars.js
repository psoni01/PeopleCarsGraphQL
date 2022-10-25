import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { Button, Card } from 'antd'
import People from '../lists/People'
import { useQuery } from '@apollo/client'
import { GET_PERSON_WITH_CARS, GET_CARS, GET_PEOPLE, GET_PERSON } from '../../queries'
import { List } from 'antd'

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

    console.log(personId);
    // const { loading1, error1, data1 } = useQuery(GET_PERSON_WITH_CARS,  {
    //     variables: {personId}
    //   })
    // if (loading1) return 'Loading...'
    // if (error1) return `Error! ${error.message}`


    // const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS)
    // if (loading) return 'Loading...'
    // if (error) return `Error! ${error.message}`


    const { loading, error, data } = useQuery(GET_PERSON, { variables: { personId } })
    // if (loading) {
    //     return 'Loading...'
    // };
    // if (error) {
    //     return `Error! ${error.message}`
    // }


    const { loading2, error2, data2 } = useQuery(GET_PERSON_WITH_CARS, { variables: { personId } })
    // if (loading2) return 'Loading...'
    // if (error2) return `Error! ${error.message}`

    // console.log(`data1: ${data.person.firstName}`);
    // console.log(`data2: ${data2.personWithCars}`);


    return (
        // <ApolloProvider client={client}>
        <div className='People'>
            <h1>Person ID : {personId}</h1>
            {(loading || loading2) ? <h1>Still Loading</h1> :

                (<Card
                    style={styles.card}
                >
                    {data.person.firstName} {data.person.lastName}
                    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
                        {/* {data2.personWithCars[0].year} */}
                        {/* {data2.personWithCars.map(({ id, year , make, model}) => (
      <List.Item key={id}>
          <Card type="inner" title={`${make} ${model}`} >
    Year: {year}
  </Card>   
      </List.Item>
    ))} */}
                    </List>
                </Card>)}

            <Link to={`/`}>GO BACK HOME</Link>
        </div>
        // </ApolloProvider>
    )
}

export default PeopleWithCars
