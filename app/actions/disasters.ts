"use server"
import { redirect } from "next/navigation";
import { apiUrl } from "./api";
import { cookies } from "next/headers";

export async function addDisaster(data: FormData, file: File[]) {
    const cookieStore = await cookies();
    const backendForm = new FormData();
    backendForm.append("title", data.get("title") as string);
    backendForm.append("location", data.get("location") as string);
    backendForm.append("relief_status", data.get("relief_status") as string);
    backendForm.append("description", data.get("description") as string);
    if (file.length > 0) {
        backendForm.append("image", file[0]);
    }
    const res = await fetch(`${apiUrl}/api/disasters/add/`, {
        method: 'POST',

        body: backendForm ,
        headers: {
            "Authorization": `Bearer ${cookieStore.get('access_token')?.value}`
        }
    });
    if (!res.ok) {
        return redirect('/disasters/add/?error=something_went_wrong');
    }
    return redirect('/disasters');
}

export async function getDisasters() {
    const res = await fetch(`${apiUrl}/api/disasters/`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!res.ok) {
        return [];
    }
    const data = await res.json();
    return data;
}