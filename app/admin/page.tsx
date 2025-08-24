"use client"

import React, { useEffect, useState } from 'react'
import { getAllHelpRequests } from '../actions/admin';
import { PrimaryButton } from '@/components/ui/buttons';
import Link from 'next/link';
import Image from 'next/image';
import { apiUrl } from '../actions/api';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { updateStatusAdmin } from '../actions/help_requests';

export default function page() {
  const [helpRequests, sethelpRequests] = useState([])
  useEffect(() => {
    (async () => {
      const res = await getAllHelpRequests()
      sethelpRequests(res)
    })()
  }, [])
  return (
    <div>
      <div className='p-4'>
        <Link href={'/disasters/add'}><PrimaryButton text="Add Disaster" className="bg-[#ff00843c] w-fit text-[#9b0055]" /></Link>
      </div>
      <div className='flex flex-col p-4 items-center'>
        <h1 className='text-xl font-semibold'>Active Help Requests</h1>
        <br />
        <div className='flex flex-wrap gap-4 items-center justify-center'>
          {helpRequests?.map((helpRequest: any) => (
            <div key={helpRequest.id} className='flex max-w-2xl gap-4 flex-col md:flex-row lg:flex-row border w-fit p-4 rounded-lg shadow-sm'>
              <Image src={apiUrl + helpRequest.image} width={300} height={200} alt='Help Request Image' className='rounded-lg mb-2 h-fit' />
              <div className='flex flex-col'>
                <h2 className='text-xl font-semibold'>{helpRequest.description}</h2>
                <p className='text-gray-600'>Location: {helpRequest.location}</p>
                <p className='text-gray-600'>Status: {helpRequest.status}</p>
                <p className='text-gray-600'>Type: {helpRequest.type}</p>
                <p className='mt-2 line-clamp-4' >{helpRequest.description}</p>
                <p className='text-gray-600' >Phone: {helpRequest.phone_number}</p>
                <p className='text-gray-600' >Email: {helpRequest.user.email}</p>
                <div className='inline-flex gap-4 mt-auto justify-self-end'>
                  {helpRequest.type === "financial aid" ? <PrimaryButton text="Pay" className="bg-[#fbff003c] text-[#989b00]" /> : <></>}
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className='btn w-full inline-flex bg-[#00ffb33c] text-[#009b7c] items-center justify-center md:text-xl lg:text-xl'>
                        Update Status
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Update Status</DialogTitle>
                        <DialogDescription>
                          Make changes to the status of the help request.
                        </DialogDescription>
                      </DialogHeader>
                      <form id='dialog' action={updateStatusAdmin}>
                        <input type="text" defaultValue={helpRequest.id} hidden name='id' />
                        <label htmlFor="status">Status</label>
                        <Input id='status' type="text" placeholder='Issue resolved' name='status' required />
                        <br />
                        <button form='dialog' type='submit' className='btn w-full inline-flex bg-indigo-500 text-white items-center justify-center md:text-xl lg:text-xl'>
                          Save
                        </button>
                      </form>
                      <DialogFooter>

                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
