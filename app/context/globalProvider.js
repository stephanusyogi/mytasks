"use client"
import React, { useContext, useEffect } from "react"
import { useState } from "react"
import { createContext } from "react"
import themes from './themes';
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext()
export const GlobalUpdateContext = createContext()

export const GlobalProvider = ({children}) => {
  const {user} = useUser()
  const [selectedTheme, setselectedTheme] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [tasks, setTasks] = useState([])  
  const [modal, setModal] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const theme = themes[selectedTheme]

  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  const collapseMenu = () => {
    setCollapsed(!collapsed)
  }

  const allTasks = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get("/api/tasks")

      const sorted = res.data.sort((a, b)=>{
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })

      setTasks(sorted)
      setIsLoading(false) 
    } catch (error) {
      console.log(error)
      // toast.error("Something went wrong")
    }
  }

  const deleteTask = async (id) => {
    try {
      const res = axios.delete(`/api/task/${id}`)
      toast.success("Task deleted")

      allTasks()
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  }

  const updateTask = async (task) => {
    try {
      const res = await axios.put(`/api/tasks/`, task)

      toast.success("Task updated")
      allTasks()
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  }

  const completedTasks = tasks.filter((task)=>task.isCompleted === true)
  const importantTasks = tasks.filter((task)=>task.isImportant === true)
  const incompleteTask = tasks.filter((task)=>task.isCompleted === false)

  useEffect(() => {
    if (user) allTasks()
  }, [user])
  

  return(
    <GlobalContext.Provider value={{ 
      theme, 
      tasks, 
      deleteTask, 
      isLoading, 
      completedTasks, 
      importantTasks, 
      incompleteTask, 
      allTasks,
      updateTask,
      modal,
      openModal,
      closeModal,
      collapseMenu,
      collapsed}}>
      <GlobalUpdateContext.Provider value={{  }}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  )
}

export const useGlobalState = () => useContext(GlobalContext)
export const useGlobalUpdate = () => useContext(GlobalUpdateContext)