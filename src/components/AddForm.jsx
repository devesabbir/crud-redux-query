import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import {useNavigate } from 'react-router-dom'


import { useAddUserMutation } from '../api/apiSlice'



const AddForm = () => {

  const [userAdd] = useAddUserMutation()
  const [input, setInput] = useState()
  const navigate = useNavigate()

  //handle input 
  const handleInput = (e) => {
    let name = e.target.name 
    let value = e.target.value
    setInput((prev) => ({
      ...prev,
      [name]: value
    }))
  }

 // handleSubmit
 const handleSubmit = (e) => {
     e.preventDefault()
     if (!input.name || !input.email || !input.phone){
        alert('All fields are required!')
     } else {
          userAdd({...input})
          setInput('')
          navigate('/') 
     }
  
 }
 


  return (
    <Container>
         <Row>
             <Col> 
               <div className='add_form'>
                  <h4 className='text-center'>Add User</h4>
                  <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={handleInput} name="name" type="text" placeholder="Enter Name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={handleInput} name="email" type="email" placeholder="Enter email" />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control onChange={handleInput} name="phone" type="text" placeholder="Enter Phone" />
                        </Form.Group>
                        
                        
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                  </Form>
               </div>
             </Col>
         </Row>
    </Container>
  )
}

export default AddForm