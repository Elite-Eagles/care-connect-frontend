import React from 'react'
import { getUserHelpRequests } from '../actions/help_requests'
import Image from 'next/image'
import { CTAButton, PrimaryButton } from '@/components/ui/buttons'
import { FaHeartbeat } from 'react-icons/fa'
import { HiLocationMarker, HiPlus } from "react-icons/hi";
import { apiUrl } from '../actions/api'
import Link from 'next/link'

export default async function page() {
    const data = await getUserHelpRequests()
    if (data?.length != 0) {
        return (
            <div className='flex flex-col w-full items-center justify-center'>
                <div className="flex mt-10 flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                    <Link href="/help/needed"><PrimaryButton text="New Help Request" className="bg-[#0080ff3c] text-[#002e9b]" icon={<HiPlus />} /></Link>
                    <Link href="/donate"><CTAButton text="Donate Now" icon={<FaHeartbeat />} className="" /></Link>
                    <Link href="/resources"><PrimaryButton text="Resources near me" className="bg-[#0080ff3c] text-[#002e9b]" icon={<HiLocationMarker />} /></Link>
                </div>
                <h1 className='text-xl font-semibold p-4'>Your Help Requests</h1>
                <div className='flex flex-wrap justify-center gap-4 p-4'>
                    {data?.map((helpRequest: any) => (
                        <div key={helpRequest.id} className='flex max-w-2xl gap-4 flex-col md:flex-row lg:flex-row border w-fit p-4 rounded-lg shadow-sm'>
                            <Image src={apiUrl + helpRequest.image} width={300} height={200} alt='Help Request Image' className='rounded-lg mb-2' />
                            <div>
                                <h2 className='text-xl font-semibold'>{helpRequest.description}</h2>
                                <p className='text-gray-600'>Location: {helpRequest.location}</p>
                                <p className='text-gray-600'>Status: {helpRequest.status}</p>
                                <p className='mt-2 line-clamp-4' >{helpRequest.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    return (
        <div className='flex flex-col mt-20 w-full h-vw justify-center items-center'>
            <Image src="/not_found.png" width={500} height={500} alt=''></Image>
            <h1 className='text-lg font-semibold p-4'>No Help Requests Found</h1>
            <div className="flex mt-10 flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                <Link href="/help/needed"><PrimaryButton text="New Help Request" className="bg-[#0080ff3c] text-[#002e9b]" icon={<HiPlus />} /></Link>
                <Link href="/donate"><CTAButton text="Donate Now" icon={<FaHeartbeat />} className="" /></Link>
                <Link href="/resources"><PrimaryButton text="Resources near me" className="bg-[#0080ff3c] text-[#002e9b]" icon={<HiLocationMarker />} /></Link>
            </div>
        </div>
    )
}
