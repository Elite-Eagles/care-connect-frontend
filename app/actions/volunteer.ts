"use server"

import { redirect } from "next/navigation";
import { apiUrl } from "./api";
import { cookies } from "next/headers";

export async function becomeVolunteer(data: FormData) {
    const cookieStore = await cookies();
    const backendForm = new FormData();
    backendForm.append("phone_number", data.get("phone") as string);
    backendForm.append("aadhar_id", data.get("aadhar") as string);
    backendForm.append("location", data.get("location") as string);
    const res = await fetch(`${apiUrl}/api/volunteers/become/`, {
        method: 'POST',
        body: backendForm ,
        headers: {
            "Authorization": `Bearer ${cookieStore.get('access_token')?.value}`
        }
    });
    if (!res.ok) {
        return redirect('/volunteer/become/?error=something_went_wrong');
    }
    return redirect('/volunteer/success');
}

export async function getHelpRequests() {
    const cookieStore = await cookies();
    const res = await fetch(`${apiUrl}/api/volunteers/help-requests/`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${cookieStore.get('access_token')?.value}`
        }
    });
    if (!res.ok) {
        return [];
    }
    const data = await res.json();
    return data;
}

export async function getResources(){
    const cookieStore = await cookies();
    const res = await fetch(`${apiUrl}/api/volunteers/resources/`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${cookieStore.get('access_token')?.value}`
        }
    });
    if (!res.ok) {
        return [];
    }
    const data = await res.json();
    return data;
}