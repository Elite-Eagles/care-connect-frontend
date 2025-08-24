"use server"

import { cookies } from "next/headers";
import { apiUrl } from "./api";

export async function user_authenticated() {
    const cookieStore = await cookies()
    const response = await fetch(`${apiUrl}/api/accounts/is-authenticated`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookieStore.get('access_token')?.value}`
        }
    })
    const data = await response.json()
    return data
}