import React, { useState, useRef, useEffect } from 'react'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, Route, Routes } from 'react-router-dom'

import Pins from './Pins'
import { Sidebar, UserProfile } from '../components'
import { client } from '../client'
import logo from '../assets/logo.png'
import { userQuery } from '../utils/data'




const Home = () => {
   const [toggleSidebar, setToggleSidebar] = useState(false)
   const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
   const scrollRef = useRef(null)
   const [user, setUser] = useState(null)

   useEffect(() => {
      scrollRef.current.scrollTo(0, 0)
   }, []);


   useEffect(() => {
      const query = userQuery(userInfo?.googleId);
      client.fetch(query)
         .then((data) => {
            setUser(data[0])
         })
   }, []);

   return (
      <div className='flex bg-grey-50 md:flex-row flex-col h-screen trasaction-height duration-75 ease-out'>
         <div className='hidden md:flex h-screen flex-initial'>
            <Sidebar user={user && user} />
         </div>
         <div className='flex md:hidden flex-row'>
            <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
               <HiMenu fontSize={40} className='curser-pointer' onClick={() => setToggleSidebar(true)} />
               <Link to="/">
                  <img src={logo} alt="logo" className='w-28'></img>
               </Link>
               <Link to={`user-profile/${user?._id}`}>
                  <img src={user?.image} alt="logo" className='w-28'></img>
               </Link>
            </div>
            {toggleSidebar && (
               <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
                  <div className='absolute w-full flex justify-end items-center p-2'>
                     <AiFillCloseCircle fontSize={30} className='curser-pointer' onClick={() => setToggleSidebar(false)} />
                  </div>
                  <Sidebar user={user && user} closeToogle={setToggleSidebar} />
               </div>
            )}
         </div>

         <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
            <Routes>
               <Route path='/user-profile/:userId' element={<UserProfile />} />
               <Route path='/*' element={<Pins user={user && user} />} />
            </Routes>

         </div>
      </div>
   )
}

export default Home
