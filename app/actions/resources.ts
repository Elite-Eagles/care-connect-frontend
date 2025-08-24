"use server";

import { cookies } from "next/headers";
import { apiUrl } from "./api";
import { redirect } from "next/navigation";

export async function addResource(data: FormData) {
    const cookieStore = await cookies();
    const backendForm = new FormData();
    backendForm.append("type", data.get("type") as string);
    backendForm.append("description", data.get("description") as string);
    backendForm.append("contact_info", data.get("contact_info") as string);
    backendForm.append("location", data.get("location") as string);
    const res = await fetch(`${apiUrl}/api/resources/add/`, {
        method: 'POST',
        body: backendForm,
        headers: {
            "Authorization": `Bearer ${cookieStore.get('access_token')?.value}`
        }
    });
    if (!res.ok) {
        return redirect('/resources/add/?error=something_went_wrong');
    }
    return redirect('/volunteer');
}

export async function getNearbyResources(){
    const cookieStore = await cookies();
    const res = await fetch(`${apiUrl}/api/resources/get-nearby-resources/`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${cookieStore.get('access_token')?.value}`,
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) {
        return [];
    }
    const data = await res.json();
    return data;
}