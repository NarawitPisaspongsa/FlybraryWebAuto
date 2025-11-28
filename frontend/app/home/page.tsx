'use client'

// import next
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { handler } from '../api/auth/[...nextauth]/route';

export default function Home() {
  // Primary variables
  const router = useRouter()

  const session = getServerSession(handler);
  console.log("USER PROFILE: ", session)

  return (
    <main className='flex flex-col leading-none mt-20'>
        HOME PAGE
    </main>
  )
}