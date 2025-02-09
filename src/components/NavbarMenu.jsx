import { div } from 'motion/react-client'
import React from 'react'
import logo from '../../public/logo.png'
import {Link} from 'react-router-dom'
const navItems=[
  {
    key:1,
    name: 'HOME',
    href:'/'
  },{
    key:2,
    name:'SHOP',
    href:'shop',
  },
  {
    key:4,
    name:'CART',
    href:'cart'
  }
]

export default function NavbarMenu() {
  return (
    <div className='bg-[#4a089a] bg-gradient-to-r from-[#7DD6FF] to-[#2D79FC ] items-center h-20 flex flex-row justify-between'>
      <div className='w-32'>
        <img className='p-2 rounded-full hover:scale-110 transition-all duration-500' src={logo} alt="" />
      </div>          
      <div>
      <div className='flex  w-full  p-4 flex-row'>
        {navItems.map((item)=>(
          <div className=' text-xl text-white font-syne mx-3   '>
            <Link key={item.key} to={item.href}>
              {item.name}
            </Link>
          </div>
        ))}
      </div>
      </div>     
    </div>
  )
}
