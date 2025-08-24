import React from 'react'
import { cn } from "@/lib/utils"

export function PrimaryButton(props: any) {
  return (
    <div>
      <button type={props.type} form={props.form} className={cn('btn text-white w-full inline-flex items-center justify-center md:text-xl lg:text-xl',props.className)}>
        {props.icon}
        &nbsp;
        {props.text}
      </button>
    </div>
  )
}

export function SecondaryButton(props: any) {
  return (
    <div>
      <button className='btn text-white bg-secondary w-full inline-flex items-center justify-center md:text-xl lg:text-xl'>
        {props.icon}
        &nbsp;
        {props.text}
      </button>
    </div>
  )
}

export function LongButton(props: any) {
  return (
    <div>
      <button className={cn('btn bg-secondary w-full rounded', props.className)} type={props.type || 'button'} onClick={props.onClick}>
        {props.icon}
        &nbsp;
        {props.text}
      </button>
    </div>
  )
}

export function CTAButton(props: any) {
  return (
    <div className=''>
      <button className={cn('btn w-full inline-flex items-center justify-center md:text-xl lg:text-xl bg-gradient-to-br text-white from-[#0099ff] to-[#00d5ff]', props.className)} type={props.type || 'button'} onClick={props.onClick}>
        <div className='text-2xl'>{props.icon}</div>
        &nbsp;
        <div className='block text-lg font-semibold'>{props.text}</div>
      </button>
    </div>
  )
}
