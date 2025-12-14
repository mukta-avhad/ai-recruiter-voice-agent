
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function LandingPage() {
  const router = useRouter()

  const goToAuth = () => {
    router.push('/auth')
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 text-white px-4">
      
      {/* Background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-pulse-slow absolute w-96 h-96 bg-white opacity-10 rounded-full -top-32 -left-32"></div>
        <div className="animate-pulse-slow absolute w-72 h-72 bg-white opacity-10 rounded-full -bottom-32 -right-32"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <Image src="/logo.jpeg" width={150} height={50} alt="logo" className="mb-8" />
        <h1 className="text-5xl font-extrabold mb-4">Welcome to AiCruiter</h1>
        <p className="text-lg md:text-xl mb-8 max-w-md">
          Your AI-powered recruitment assistant is here!  
          Click below to start your journey and find the perfect candidates faster.
        </p>
        <Button 
          onClick={goToAuth} 
          className="bg-white text-purple-600 font-bold px-10 py-4 rounded-full text-lg shadow-lg hover:scale-105 transition-transform"
        >
          Start Your Journey
        </Button>
      </div>
    </div>
  )
}
