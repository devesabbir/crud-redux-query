import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import {Link, useLocation, useNavigate } from 'react-router-dom'


import {useEditUserMutation, useGetSingleUserQuery } from '../api/apiSlice'



const EditForm = () => {
   
  const state = useLocation()
  const [userUpdate] = useEditUserMutation()
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    } = useGetSingleUserQuery(state.state.id)
  
  const [input, setInput] = useState()
  const navigate = useNavigate()

  // handle input 
  const handleInput = (e) => {
    let name = e.target.name 
    let value = e.target.value
    setInput((prev) => ({
      ...prev,
      [name]: value
    }))
  }

 // handleSubmit
 const handleSubmit = async (e) => {
     e.preventDefault()
     if (!input.name || !input.email || !input.phone){
        alert('All fields are required!')
     } else {
         await userUpdate({id:state.state.id, ...input})
          setInput('')
          navigate('/') 
     }
  
 }

 useEffect(() => {
   setInput((prev) => ({
      ...prev,
      ...data
   }))
 },[data])
 
 if (isLoading) return <h3>Loading...</h3>
 if (isError) return <p>{error}</p>
 if (isSuccess) return (
    <Container>
         <Row>
             <Col> 
               <div className='add_form'>
                  <h4 className='text-center'>Edit User</h4>
                  <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={handleInput} name="name" value={input.name} type="text" placeholder="Enter Name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={handleInput} name="email" value={input.email} type="email" placeholder="Enter email" />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control onChange={handleInput} name="phone" value={input.phone} type="text" placeholder="Enter Phone" />
                        </Form.Group>
                        
                        <Link to={'/'}>
                         <Button className='me-2' variant="success">
                             Back
                         </Button>
                        </Link>
                        <Button variant="primary" type="submit">
                            Update
                        </Button>  
                       
                  </Form>
               </div>
             </Col>
         </Row>
    </Container>
  )

 
}

export default EditForm