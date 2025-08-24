"use client"
import { LongButton } from '@/components/ui/buttons'
import { Input } from '@/components/ui/input'
import React from 'react'
import { donate } from '../actions/donate'
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

export default function page() {
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
                <h1 className='text-xl font-semibold'>Donate Money</h1>
                <form action={donate}>
                    <br />
                    <label htmlFor="name">Full name</label>
                    <Input id='name' type="text" placeholder='John Doe' name='name' required />
                    <br />
                    <label htmlFor="email">Email</label>
                    <Input id='email' type="email" placeholder='johndoe12@example.com' name='email' required />
                    <br />
                    <label htmlFor="location">Location</label>
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
                    <label htmlFor="relief_status">Amount</label>
                    <Input id='relief_status' type="text" placeholder='5000' name='amount' required />
                    <br />
                    <LongButton type="submit" text='submit' className='bg-indigo-500 text-white text-xl' />
                </form>
            </div>
        </div>
    )
}
