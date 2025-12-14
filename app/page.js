"use client"
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
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <h1 className="text-4xl font-bold mb-6">Welcome to AiCruiter</h1>
      <p className="text-lg mb-8 text-center max-w-md">
        Your AI-powered recruitment assistant is here!  
        Click below to start your journey.
      </p>
      <Button onClick={goToAuth} className="px-8 py-4 text-lg font-semibold">
        Start Your Journey
      </Button>
      <div className="mt-10">
        <Image src="/logo.jpeg" width={150} height={50} alt="logo" />
      </div>
    </div>
  )
}
