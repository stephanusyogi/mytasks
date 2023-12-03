"use client"

import React from 'react'
import { useGlobalState } from '../context/globalProvider'
import Tasks from '../Components/Tasks/Tasks'

function page() {
  const {incompleteTask} = useGlobalState()
  
  return (
    <Tasks title='Incomplete Tasks' tasks={incompleteTask}/>
  )
}

export default page