import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'


import { useDeleteUserMutation, useGetSingleUserQuery } from '../api/apiSlice'

const Single = () => {
   const state = useLocation()
   const { data,isLoading,isSuccess, isError, error} = useGetSingleUserQuery(state.state.id)
   const [deleteUser] = useDeleteUserMutation()
   const navigate = useNavigate()


    // handle Delete 
  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete?')){
       await deleteUser(id)
       navigate('/')
    }
  }


   if(isLoading) return <h3>Loading...</h3>
   if(isError) return <p>{error}</p>
   if (isSuccess) {
     
    return (
      <>
        <Container>
             <Row>
                 <Col>
                    <div className='single_page'>
                        <h2 className='text-center'>Details:</h2>
                      <Card style={{ width: '18rem', margin:'0 auto'}}>
                          <Card.Img variant="top" src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" />
                           <Card.Body>
                             <p>Name:{data.name}</p>
                             <p>Email:{data.email}</p>
                             <p>Phone:{data.phone}</p>
                             <Link to={'/'}>
                               <Button variant="success">Back</Button>
                             </Link>
                             <Button onClick={() => handleDelete(state.state.id)} className='ms-2' variant="danger">Delete</Button>
                          </Card.Body>
                        </Card>
                    </div>
                 </Col>
             </Row>
        </Container>
      </>
   )}
 
}

export default Single