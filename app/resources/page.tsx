"use client"

import React, { useEffect, useState } from 'react'
import { getNearbyResources } from '../actions/resources'

export default function page() {
    const [resources, setResources] = useState([])
    useEffect(() => {
        (async () => {
            const data = await getNearbyResources()
            setResources(data)
        })()
    }, [])
    return (
        <div>
            <div className='flex flex-wrap justify-center gap-4 p-4'>
                {resources?.map((resource: any) => (
                    <div key={resource.id} className='flex max-w-2xl gap-4 flex-col md:flex-row lg:flex-row border w-fit p-4 rounded-lg shadow-sm'>
                        <div>
                            <p className='mt-2 line-clamp-4' >{resource.description}</p>
                            <h2 className=''>Type: {resource.type}</h2>
                            <p className='text-gray-600'>Location: {resource.location}</p>
                            <p className='text-lg '>Contact Info: {resource.contact_info}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
