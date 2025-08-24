"use client"

import { helpRequestCreate } from '@/app/actions/help_requests';
import { LongButton } from '@/components/ui/buttons';
import { FileUpload } from '@/components/ui/file-upload';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

export default function page() {
    const [file, setFiles] = useState<File[]>([]);
    const [select, setSelect] = useState<string>('')
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete();

    const handleFileUpload = (file: File[]) => {
        setFiles(file);
    };
    const handleSelect = async (address: string) => {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
    };
    return (
        <div className='flex flex-col w-full items-center'>
            <div className='w-full max-w-2xl flex gap-4 flex-col p-4'>
                <h1 className='text-xl font-semibold'>Request Help</h1>
                <form action={async (formData) => { await helpRequestCreate(formData, file) }}>
                    <FileUpload onChange={handleFileUpload} Title='Upload Image' Description='Drag and Drop or upload the image of disaster' />
                    <br />
                    <label htmlFor="phone">Phone</label>
                    <Input id='phone' type="number" placeholder='0000000000' name='phone' required maxLength={10} />
                    <br />
                    <label htmlFor="aadhar">Aadhar ID</label>
                    <Input id='aadhar' type="number" placeholder='0000 0000 0000' name='aadhar' required maxLength={12} minLength={12} />
                    <br />
                    <Select onValueChange={(value) => setSelect(value)} value={select} name='type'>
                        <label htmlFor="">Type</label>
                        <SelectTrigger className="w-full p-6 text-lg" >
                            <SelectValue className='' placeholder="Select type of help needed" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup className='text-lg'>
                                <SelectItem value="financial aid">Financial aid</SelectItem>
                                <SelectItem value="food and shelter">Food and Water</SelectItem>
                                <SelectItem value="shelter">Shelter</SelectItem>
                                <SelectItem value="medical aid">Medical aid</SelectItem>
                                <SelectItem value="others">Others</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <br />
                    {select === "financial aid" ?
                        <>
                        <div className='flex flex-col gap-2 md:flex-row lg:flex-row'>
                            <div>
                                <label htmlFor="account_number">Bank account number</label>
                                <Input id='account_number' type="number" placeholder='XXXXXXXXXXX' name='account_number' required/>
                            </div>
                            <br />
                            <div>
                                <label htmlFor="ifsc_code">IFSC Code</label>
                                <Input id='ifsc_code' type="text" placeholder='eg. SBIN0001234' name='ifsc_code' required/>
                            </div>
                        </div>
                        <br />
                        </>
                        : <></>}
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
                    <label htmlFor="description">Describe the disaster</label>
                    <Textarea id='description' placeholder='Description' className='input h-44' name='description' required></Textarea>
                    <br />
                    <LongButton type="submit" text='submit' className='bg-indigo-500 text-white text-xl' />
                </form>
            </div>
        </div>
    )
}
