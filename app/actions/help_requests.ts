"use server"

import { cookies } from "next/headers";
import { apiUrl } from "./api";
import { redirect } from "next/navigation";

export async function helpRequestCreate(data: FormData, file: File[]) {
    const cookieStore = await cookies();
    const backendForm = new FormData();
    backendForm.append("aadhar_id", data.get("aadhar") as string);
    backendForm.append("location", data.get("location") as string);
    backendForm.append("description", data.get("description") as string);
    backendForm.append("phone_number", data.get("phone") as string);
    backendForm.append("type", data.get("type") as string);
    backendForm.append("bank_details.account_number", data.get("account_number") as string);
    backendForm.append("bank_details.ifsc_code", data.get("ifsc_code") as string);
    if (file.length > 0) {
        backendForm.append("image", file[0]);
    }
    const res = await fetch(`${apiUrl}/api/help-requests/create/`, {
        method: 'POST',

        body: backendForm,
        headers: {
            "Authorization": `Bearer ${cookieStore.get('access_token')?.value}`
        }
    });
    if (!res.ok) {
        return redirect('/help/needed/?error=something_went_wrong');
    }
    return redirect('/dashboard');
}

export async function getUserHelpRequests() {
    const cookieStore = await cookies();
    const res = await fetch(`${apiUrl}/api/help-requests/list/`, {
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

export async function getAllHelpRequests() {
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

export async function updateStatusAdmin(data: FormData) {
    const cookieStore = await cookies();
    const id = data.get("id");
    const status = data.get("status");
    const res = await fetch(`${apiUrl}/api/help-requests/create/`, {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${cookieStore.get('access_token')?.value}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            status: status
        })
    });
    if (!res.ok) {
        return redirect('/admin/?error=something_went_wrong');
    }
    return redirect('/admin');
}