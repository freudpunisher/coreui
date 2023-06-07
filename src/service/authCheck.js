import React from 'react'
import { Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const AuthCheck = ({ children }) => {
  // Récupérer le token du localStorage
  const token = sessionStorage.getItem('user')

  if (token) {
    return children
  }
  return <Navigate to="/login#/login" />
}

export default AuthCheck
