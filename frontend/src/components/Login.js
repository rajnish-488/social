import React from 'react';
import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logo.png'

const Login = () => {

   return (
      <div className='flex justify-start items-center flex-col h-screen'>
         <div className='relative w-full h-full'>
            <video
               src={shareVideo}
               type='video/mp4'
               loop
               controls={false}
               muted
               autoPlay
               className='w-full h-full object-cover'
            />
            <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 botton-0 bg-blackOverlay w-full h-full'>
               <div className='p-5'>
                  <img src={logo} width="130px" alt="logo" />
               </div>
               <div className='shawod-2xl'>
                  <GoogleLogin
                     clientId=''
                     render={(renderProps) => (
                        <button
                           type='button'
                           className='bg-mainColor flex justify-center p-3 rounded-lg curser-pointer outline-none'
                           onClick={renderProps.onClick}
                           disabled={renderProps.disabled}
                        >
                           <FcGoogle className='mr-4' />
                           Sign in with Google
                        </button>
                     )}
                     onSuccess={responceGoogle}
                     onFailure={responseGoogle}
                     cookiePolicy='single_host_origin'
                  />
               </div>
            </div>
         </div>


      </div>
   )
}

export default Login