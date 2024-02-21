"use client"

import Input from '@/components/Input'
import axios from "axios"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { useCallback, useState } from 'react'
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function Auth() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  })

  const handleChange = (env: any) => {
    setFormData(prev => {
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

  // Register

  const register = useCallback(async () => {
    try {
      console.log(formData)
      await axios.post('/api/auth/register', formData).then((res) => {
        console.log(res)
      })

      login()

    } catch (error: any) {
      console.log(error)
    }
  }, [formData])

  const login = useCallback(async () => {
    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      },
      )

      if (result?.error) {
        // Handle login error
        console.error('Login failed:', result.error)
      } else {
        // Redirect to home page upon successful login
        router.push('/')
      }

    } catch (error: any) {
      console.log(error)
    }
  }, [formData.email, formData.password, router])


  return (
    <div className="relative w-full h-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-cover bg-center">
      <div className="h-full w-full bg-black lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center my-2 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {
                variant === 'login' ? 'Sign in' : 'Register'
              }
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && <Input
                onChange={handleChange}
                id='name'
                label='Username'
                value={formData.name}
                type='text'
              />}
              <Input
                onChange={handleChange}
                id='email'
                label='Email'
                value={formData.email}
                type='email'
              />

              <Input
                onChange={handleChange}
                id='password'
                label='Password'
                value={formData.password}
                type='password'

              />

            </div>
            <button onClick={variant === 'login' ? login : register}
              className='bg-red-600
                    py-3
                    text-white
                    rounded-md
                    w-full mt-10
                    hover:bg-red-700
                    transition'>
              {variant === 'login' ? 'Login' : 'Register'}
            </button>

            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div className="
                  w-10 bg-white h-10 rounded-full flex
                  items-center justify-center cursor-pointer
                  hover:opacity-80 transition
                ">
                <FcGoogle size={30} />
              </div>

              <div
              onClick={() => signIn('github', {callbackUrl: '/'})}
              className="
                  w-10 bg-white h-10 rounded-full flex
                  items-center justify-center cursor-pointer
                  hover:opacity-80 transition
                ">
                <FaGithub size={30} />
              </div>
            </div>

            {
              variant === 'login' ?

                <p className='text-neutral-500 mt-12 '>
                  First time using Netflix ? <span onClick={toggleVariant} className='text-white ml-1 hover:underline cursor-pointer'>
                    Create an account
                  </span>
                </p>

                :

                <p className='text-neutral-500 mt-12 '>
                  Already have an account ? <span onClick={toggleVariant} className='text-white ml-1 hover:underline cursor-pointer'>
                    Sign in
                  </span>
                </p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}