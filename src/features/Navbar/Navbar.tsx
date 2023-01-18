import React from 'react'
import Navbar from './components/Navbar'

interface NavbarProps {
    cityName: string
}
export default ({cityName}: NavbarProps) => {
  return (
    <Navbar cityName={cityName} />
  )
}
