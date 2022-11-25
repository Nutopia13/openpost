import React from 'react'
import { Github } from '../assets/Icons'

const Footer = () => {
  return (
    <footer className='flex items-center mt-24 mb-4   justify-end w-full'>
        <div className='mx-6'>
           <a href="https://github.com/Nutopia13" target='_blank'><Github /></a> 
        </div>
    </footer>
  )
}

export default Footer