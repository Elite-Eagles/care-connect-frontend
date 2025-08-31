"use client"

import { helpRequestCreate } from '@/app/actions/help_requests';
import { becomeVolunteer } from '@/app/actions/volunteer';
import { LongButton } from '@/components/ui/buttons';
import { FileUpload } from '@/components/ui/file-upload';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

export default function Page() {
    const [select, setSelect] = useState<string>('')
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete();

    const handleSelect = async (address: string) => {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
    };
    return (
        <div className='flex flex-col w-full items-center'>
            <div className='w-full max-w-2xl flex gap-4 flex-col p-4'>
                <h1 className='text-xl font-semibold'>Become A Volunteer</h1>
                <form action={becomeVolunteer}>
                    <br />
                    <label htmlFor="phone">Phone</label>
                    <Input id='phone' type="number" placeholder='0000000000' name='phone' required maxLength={10} />
                    <br />
                    <label htmlFor="aadhar">Aadhar ID</label>
                    <Input id='aadhar' type="number" placeholder='0000 0000 0000' name='aadhar' required maxLength={12} minLength={12} />
                    <br />
                    <label htmlFor="location">Your location</label>
                    <Input value={value} onChange={(e) => setValue(e.target.value)} disabled={!ready} id='location' type="text" placeholder='Pragatinagar Gumma, Shimla' name='location' required />
                    {status === "OK" && (
                        <ul className="border rounded bg-white shadow mt-1">
                            {data.map(({ place_id, description }) => (
                                <li
                                    key={place_id}
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSelect(description)}
                                >
                                    {description}
                                </li>
                            ))}
                        </ul>
                    )}
                    <br />
                    <label htmlFor="description">Why do you want to be a volunteer ?</label>
                    <Input id='description' type="text" placeholder='I want to become a volunteer because...' name='reason' />
                    <br />
                    <LongButton type="submit" text='submit' className='bg-indigo-500 text-white text-xl' />
                </form>
            </div>
        </div>
    )
}
