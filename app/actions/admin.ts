"use server"

import { apiUrl } from "./api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function getAllHelpRequests(){
    const cookieStore = await cookies();
    const res = await fetch(`${apiUrl}/api/help-requests/all/`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${cookieStore.get('access_token')?.value}`,
            "Content-Type": "application/json",
        }
    });
    if (!res.ok) {
        return null;
    }
    const data = await res.json();
    return data;
}