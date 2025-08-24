"use client";
import { addDisaster } from '@/app/actions/disasters'
import { LongButton } from '@/components/ui/buttons'
import { FileUpload } from '@/components/ui/file-upload'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

export default function page() {
    const [file, setFiles] = useState<File[]>([]);
    const handleFileUpload = (file: File[]) => {
        setFiles(file);
    };
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
                <h1 className='text-xl font-semibold'>Add Disaster</h1>
                <form action={async (formData) => {await addDisaster(formData, file);}}>
                    <FileUpload onChange={handleFileUpload} Title='Upload Image' Description='Drag and Drop or upload the image of disaster'/>
                    <br />
                    <label htmlFor="title">Title</label>
                    <Input id='title' type="text" placeholder='Cloud Burst' name='title' required/>
                    <br />
                    <label htmlFor="location">Location</label>
                    <Input value={value} onChange={(e) => setValue(e.target.value)} disabled={!ready} id='location' type="text" placeholder='Pragatinagar Gumma, Shimla' name='location' required/>
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
                    <label htmlFor="relief_status">Relief status</label>
                    <Input id='relief_status' type="text" placeholder='Safe' name='relief_status' required/>
                    <br />
                    <label htmlFor="description">Describe the disaster</label>
                    <Textarea id='description' placeholder='Description' className='input h-44' name='description' required></Textarea>
                    <br />
                    <LongButton type="submit" text='submit' className='bg-indigo-500 text-white text-xl' />
                </form>
            </div>
        </div>
    )
}
