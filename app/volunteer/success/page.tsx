import Link from 'next/link'
import React from 'react'

export default function Page() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold'>Thank You for Registering as a Volunteer!</h1>
        <Link href={'/volunteer'} className='mt-4 text-lg underline' >Go To Volunteer Dashboard</Link>
    </div>
  )
}
