"use client"

import { PinContainer } from '@/components/ui/3d-pin'
import React, { useEffect, useState } from 'react'
import { getDisasters } from '../actions/disasters'
import { apiUrl } from '../actions/api'

export default function page() {
  const [disasters, setDisasters] = useState([])
  useEffect(() => {
    (async () => {
      const data = await getDisasters()
      setDisasters(data)
      console.log(data)
    })()
  }, [])
  return (
    <div className="h-[40rem] w-full flex items-center justify-center ">
      {disasters?.map((disaster: any) => (
        <PinContainer
          title="/ui.aceternity.com"
          href="https://twitter.com/mannupaaji"
          url={apiUrl + disaster.image}
          key={disaster.id}
        >
          <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
            <h3 className="max-w-xs !pb-2 !m-0 font-bold text-black text-base">
              
            </h3>
            <div className="text-base !m-0 !p-0 text-black font-normal">
              <span className="">
                Customizable Tailwind CSS and Framer Motion Components.
              </span>
            </div>
            <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
          </div>
        </PinContainer>
      ))}
    </div>
  )
}
