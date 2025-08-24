"use client";

import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@heroui/react";
import { FaHandsHelping } from "react-icons/fa";
import { GrResources } from "react-icons/gr";
import { getHelpRequests, getResources } from "../actions/volunteer";
import Image from "next/image";
import { apiUrl } from "../actions/api";
import { HiPlus } from "react-icons/hi";
import { PrimaryButton } from "@/components/ui/buttons";
import Link from "next/link";

export default function page() {
    const [helpRequests, setHelpRequests] = useState([])
    const [resources, setResources] = useState([])
    useEffect(() => {
        (async () => {
            const res = await getHelpRequests()
            const data = await getResources()
            setHelpRequests(res)
            setResources(data)
            console.log(data)
        })()
    }, [])
    return (
        <div className="flex w-full flex-col items-center">
            <Tabs aria-label="Options" color="default" variant="bordered" className="p-4">
                <Tab
                    key="photos"
                    title={
                        <div className="flex items-center space-x-2">
                            <FaHandsHelping />
                            <span>Help Requests</span>
                        </div>
                    }
                    className="p-6 text-lg"
                >
                    <div className='flex flex-wrap justify-center gap-4 p-4'>
                        {helpRequests?.map((helpRequest: any) => (
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
                </Tab>
                <Tab
                    key="music"
                    title={
                        <div className="flex items-center space-x-2">
                            <GrResources />
                            <span>Resources</span>
                        </div>
                    }
                    className="p-6 text-lg flex flex-col items-center"
                >
                    <div className='flex flex-wrap justify-center gap-4 p-4'>
                        {resources?.map((resource: any) => (
                            <div key={resource.id} className='flex max-w-2xl gap-4 flex-col md:flex-row lg:flex-row border w-fit p-4 rounded-lg shadow-sm'>
                                <div>
                                    <p className='mt-2 line-clamp-4' >{resource.description}</p>
                                    <h2 className=''>Type: {resource.type}</h2>
                                    <p className='text-gray-600'>Location: {resource.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link href={'/resources/add'}><PrimaryButton text="Add Resource" className="w-fit bg-[#0080ff3c] text-[#002e9b]" icon={<HiPlus />} /></Link>
                </Tab>
            </Tabs>
        </div>
    );
}
