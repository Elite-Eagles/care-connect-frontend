"use server"
import { redirect } from "next/navigation";
import { apiUrl } from "./api";
import { cookies } from "next/headers";

export async function firebaseLogin(id_token: string) {
    const cookieStore = await cookies();
    const response = await fetch(`${apiUrl}/api/accounts/firebase-login/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id_token })
    })
    const data = await response.json();
    cookieStore.set({ name: 'access_token', value: data.access, httpOnly: true, secure: true, sameSite: 'strict',maxAge: 60 * 60 * 24 * 100  });
    cookieStore.set({ name: 'refresh_token', value: data.refresh, httpOnly: true, secure: true, sameSite: 'strict',maxAge: 60 * 60 * 24 * 100  });
    redirect('/landing')
}

export async function loginUser(formData: FormData) {
    const cookieStore = await cookies();
    const email = formData.get('email');
    const password = formData.get('password');
    const response = await fetch(`${apiUrl}/api/accounts/login/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    if (!response.ok) {
        if (response.status === 401) {
            redirect('/auth/?error=invalid_credentials');
        }
        else {
            redirect('/auth/?error=something_went_wrong');
        }
    }
    const data = await response.json();
    cookieStore.set({ name: 'access_token', value: data.access, httpOnly: true, secure: true, sameSite: 'strict', maxAge: 60 * 60 * 24 * 100  });
    cookieStore.set({ name: 'refresh_token', value: data.refresh, httpOnly: true, secure: true, sameSite: 'strict', maxAge: 60 * 60 * 24 * 100  });
    redirect('/landing')
}