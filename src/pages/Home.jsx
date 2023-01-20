import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate';


import { useDeleteUserMutation, useGetUsersQuery } from '../api/apiSlice'

const Home = () => {
   const navigate = useNavigate()
   const [deleteUser] = useDeleteUserMutation()
   const [currentPage, setCurrentPage] = useState(1);
   const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    } = useGetUsersQuery()
  

  
  // handle Delete 
  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete?')){
       await deleteUser(id)
    }
  }

  // handle View 
  const handleView = (id) => {
       navigate('/view/' + id, {state:{id:id}})
  }



  // handle Edit 
  const handleEdit = (id) => {
    navigate('/edit/'+ id, {state:{id:id}})
  }


  if ( isLoading ) return <h3>Loading...</h3>
  if (isError) return <p>{error}</p>
  if ( isSuccess ) {
       
     // pagination
   const itemPerPage = 10;
   const pageCount = Math.ceil(data.length / itemPerPage);
   const lastPostIndex = currentPage * itemPerPage;
   const firstPostIndex = lastPostIndex - itemPerPage
   

   const handelPageClick = async ({ selected }) => {
     setCurrentPage(selected + 1);
   };


    return (
     <>
     <section>
         <Container>
            <Row>
                <Col>
                 <h4 className='text-center' >React Redux RTK query with JSON server</h4>
                   <div className='text-center mb-2'>
                     <Link className='btn btn-light' to={'/add'}>Add Contact</Link>
                   </div>
                    <table className='data-table'>
                         <thead>
                              <tr>
                                  <th>id</th>
                                  <th>Name</th>
                                  <th>Email</th>
                                  <th>Phone</th>
                                  <th>Action</th>
                              </tr>
                         </thead>
                          <tbody>
                            {
                              data.slice(firstPostIndex,lastPostIndex).map((item , index) => (
                                  <tr key={index}>
                                 <td>{item.id}</td>
                                 <td>{item.name}</td>
                                 <td>{item.email}</td>
                                 <td>{item.phone}</td>
                                 <td>
                                    <div className='action-btns'>
                                         <button onClick={() => handleEdit(item.id)} className='btn btn-success'>Edit</button>
                                         <button onClick={() => handleDelete(item.id)} className='btn btn-danger'>Delete</button>
                                         <button onClick={() => handleView(item.id)} className='btn btn-info'>View</button>
                                     </div>
                                 </td>
                             </tr>
                              ))
                            }
                           
                           
                         </tbody>
                    </table> 
                   {
                     data.length > 10 &&  <ReactPaginate
                     className='pageinate'
                     breakLabel="..."
                     nextLabel="Next"
                     onPageChange={handelPageClick}
                     pageRangeDisplayed={2}
                     pageCount={pageCount}
                     previousLabel="Previous"
                     renderOnZeroPageCount={null}
                     activeClassName={'active'}
                 
                 /> 
                   }
                </Col>
            </Row>  
        </Container> 
     </section>

    </>
  )
  }

  
}

export default Home