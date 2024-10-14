"use client"

import React from 'react'
import { useAuth } from "./AuthContext";

export const UserDisplayName = () => {

  const {userDisplayName} = useAuth()

  return (
    <p className='absolute top-0 left-0 m-3'>{userDisplayName}</p>
  )
}

export const UserEmail = () => {

  const {userEmail} = useAuth()

  return (
    <p>{userEmail}</p>
  )
}
 