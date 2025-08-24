"use server"

import { apiUrl } from "./api"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function signupUser(formData: FormData) {
    const cookieStore = await cookies();
    const first_name = formData.get('first_name');
    const last_name = formData.get('last_name');
    const email = formData.get('email');
    const password = formData.get('password');
    const response = await fetch(`${apiUrl}/api/accounts/signup/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        })
    })
    if (!response.ok) {
        if (response.status === 400) {
            redirect('/auth/?error=user_already_exists');
        } else {
            redirect('/auth/?error=something_went_wrong');
        }
    }
    const data = await response.json()
    cookieStore.set({ name: 'access_token', value: data.access, httpOnly: true, secure: true, sameSite: 'strict' ,maxAge: 60 * 60 * 24 * 100});
    cookieStore.set({ name: 'refresh_token', value: data.refresh, httpOnly: true, secure: true, sameSite: 'strict',maxAge: 60 * 60 * 24 * 100 });
    redirect('/landing')
}