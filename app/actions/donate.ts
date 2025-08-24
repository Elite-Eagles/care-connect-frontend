"use server";
import { redirect } from "next/navigation";
import { apiUrl } from "./api";

export async function donate(formData: FormData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const amount = formData.get('amount');
    const location = formData.get('location');
    const response = await fetch(`${apiUrl}/api/donations/donate/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            donor_name: name,
            donor_email: email,
            amount: amount,
            location: location
        })
    });
    if (!response.ok) {
        throw new Error('Failed to process donation');
    }
    return redirect(`/payment/?amount=${amount}`);
}