"use client"

import { LongButton } from '@/components/ui/buttons'
import { Input } from '@/components/ui/input'
import { TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import Link from 'next/link'
import React from 'react'
import { BsMeta } from "react-icons/bs";
import { FcGoogle } from 'react-icons/fc'
import { handleFacebookSignIn, handleGoogleSignIn } from './social_auth'
import { loginUser } from '../actions/login'

export default function LogIn() {

    return (
        <div className='p-6 flex flex-col justify-center gap-4 min-w-sm'>
            <div className='flex flex-col items-center'>
                <h1 className='text-2xl font-bold'>Log In</h1>
                <div className='inline-flex'>
                    <p className=''>Don't have an account ? &nbsp;</p>
                    <TabsList className=''>
                        <TabsTrigger value="signup" className=''>Sign Up</TabsTrigger>
                    </TabsList>
                </div>
            </div>
            <div className='flex flex-col gap-2 justify-center'>
                <LongButton onClick={handleGoogleSignIn} className="socialbtn" text="Continue with Google" icon={<FcGoogle className='text-2xl' />} />
                <LongButton onClick={handleFacebookSignIn} className="socialbtn" text="Continue with Meta" icon={<BsMeta className='text-2xl' />} />
            </div>
            <div className='inline-flex justify-center items-center gap-4'><hr className='w-1/2' />or<hr className='w-1/2' /></div>
            <form action={loginUser} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">Email</label>
                    <Input type='email' name='email' required placeholder='some@example.com' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">Password</label>
                    <Input type='password' name='password' minLength={8} required />
                    <a href="" className='ml-auto justify-self-end'>Forgot Password ?</a>
                </div>
                <LongButton text="Log In" type='submit' className='text-white bg-indigo-500'/>
            </form>
        </div>
    )
}
