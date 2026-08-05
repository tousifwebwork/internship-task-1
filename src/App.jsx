import React from 'react'
import StudentForm from './components/Student_Form'
import StudentList from  './components/StudentList'
import { Route, Routes } from 'react-router-dom'

const App = () => {
 
  return (
    <div className='min-h-screen bg-gray-300 p-18'> 
    <Routes>
      <Route path='/' element={<StudentForm />} />   
      <Route path='/student-details' element={<StudentList />} />   
    </Routes>
    </div>
  )
}

export default App