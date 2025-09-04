import DashboardLayout from '@/layout/DashboardLayout'
import { axiosInstance } from '@/lib/axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()

  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [allresume, setAllresume] = useState(null)

  const fetchAllResume = async () => {
    try {
      const response = await axiosInstance.get('/resume')
      setAllresume(response.data)
      return response.data
    } catch (error) {
      console.log("Error in response", error)
    }
  }

  useEffect(() => {
    fetchAllResume()
  }, [])

  return (
   <DashboardLayout>
    Dahboard
   </DashboardLayout>
  )
}

export default Dashboard
