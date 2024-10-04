'use client'
import { useMenu } from './MenuContext'

const ActiveMenu = () => {
  
  const { activeMenu } = useMenu()

  return (
    activeMenu
  )
}

export default ActiveMenu