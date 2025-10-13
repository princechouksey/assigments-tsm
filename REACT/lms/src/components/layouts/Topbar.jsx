import { ChevronRight } from 'lucide-react'
import React from 'react'
import StatsCard from '../carts/StatsCard'
import Buttons from '../common/Buttons'

const Topbar = () => {
  let role  = localStorage.getItem("role")
  role  = role.charAt(0).toUpperCase() + role.slice(1);
  


  return (
  <div>
      <div className='w-[90vw] h-[18vh] bg-white  py-7 px-4 flex items-center justify-between '>
        <h1 className='text-4xl text-gray-900  font-semibold'>
            LMS Dashboard {role}
        </h1>
        <div className='flex items-center justify-between gap-5 px-4 '>
            <h1 className='text-md text-gray-400'>{role} Profile</h1>
            <div className='w-[50px] h-[50px] rounded-[50%] bg-white'>
               <img src="https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.png"
               className="w-[100%] h-[100%] object-cover  " alt="" />
            </div>
            <ChevronRight color='grey' />
        </div>

     
    </div>
     <StatsCard />
     <Buttons />
  </div>
  )
}

export default Topbar