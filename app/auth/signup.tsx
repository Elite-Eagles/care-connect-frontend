"use client"

import React from 'react'
import { LongButton } from '@/components/ui/buttons'
import { Input } from '@/components/ui/input'
import { TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { BsMeta } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { handleFacebookSignIn, handleGoogleSignIn } from './social_auth'
import { signupUser } from '../actions/signup'



export default function SignUp() {
    return (
        <>
            <div className='p-6 flex flex-col justify-center gap-4 w-sm'>
                <div className='flex flex-col items-center'>
                    <h1 className='text-2xl font-bold'>Sign Up</h1>
                    <div className='inline-flex'>
                        <p className=''>Already have an account ? &nbsp;</p>
                        <TabsList className=''>
                            <TabsTrigger value="login">Log In</TabsTrigger>
                        </TabsList>
                    </div>
                </div>
                <div className='flex flex-col gap-2 justify-center'>
                    <LongButton onClick={handleGoogleSignIn} className="socialbtn" text="Continue with Google" icon={<FcGoogle className='text-2xl' />} />
                    <LongButton onClick={handleFacebookSignIn} className="socialbtn" text="Continue with Meta" icon={<BsMeta className='text-2xl' />} />
                </div>
                <div className='inline-flex justify-center items-center gap-4'><hr className='w-1/2' />or<hr className='w-1/2' /></div>
                <form action={signupUser} className='flex flex-col gap-4'>
                    <div className='inline-flex gap-2'>
                        <div className='flex flex-col gap-2 w-1/2'>
                            <label htmlFor="">First Name</label>
                            <Input name='first_name' type='text' placeholder='john' required />
                        </div>
                        <div className='flex flex-col gap-2 w-1/2'>
                            <label htmlFor="">Last Name</label>
                            <Input name='last_name' type='text' placeholder='doe' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="">Email</label>
                        <Input name='email' type='email' placeholder='some@example.com' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="">Password</label>
                        <Input name='password' type='password' minLength={8} required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="">Confirm Password</label>
                        <Input type='password' minLength={8} required />
                    </div>
                    <LongButton text="Sign Up" type='submit' className='text-white bg-indigo-500'/>
                </form>
            </div>
        </>

    )
}
