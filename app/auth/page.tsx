"use client"

import Input from '@/components/Input'
import { useCallback, useState } from 'react'

export default function Auth() {

  const [signInData, setSignInData] = useState({
    email: '',
    username: '',
    password: '',
  })

  const handleChange = (env: any) => {
    setSignInData(prev => {
      return {
        ...prev, [env.target.id]: env.target.value
      }
    })
  }

  const [variant, setVariant] = useState('login')

  const toggleVariant = useCallback(() => {
    setVariant(currentVariant => {
      return currentVariant === 'login' ? 'register' : 'login'
    })
  }, [])

  return (
    <div className="relative h-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-cover bg-center">
      <div className="h-full w-full bg-black lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center my-2 lg:max-w-md rounded-md w-fulll">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {
                variant === 'login' ? 'Sign in' : 'Register'
              }
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && <Input
                onChange={handleChange}
                id='username'
                label='Username'
                value={signInData.username}
                type='username'
              />}
              <Input
                onChange={handleChange}
                id='email'
                label='Email'
                value={signInData.email}
                type='email'
              />
              
              <Input
                onChange={handleChange}
                id='password'
                label='Password'
                value={signInData.password}
                type='password'
              />

            </div>
            <button onClick={() => console.log(signInData)
            } className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'>
              Login
            </button>
            {
              variant === 'login' ?

                <p className='text-neutral-500 mt-12 '>
                  First time using Netflix ? <span onClick={toggleVariant} className='text-white ml-1 hover:underline cursor-pointer'>
                    Create an account
                  </span>
                </p>

                :

                <p className='text-neutral-500 mt-12 '>
                  First time using Netflix ? <span onClick={toggleVariant} className='text-white ml-1 hover:underline cursor-pointer'>
                    Create an account
                  </span>
                </p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}