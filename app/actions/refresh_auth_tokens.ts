"use server"
import { cookies } from "next/headers";
import { apiUrl } from "./api";

export const fetchNewAccessToken = async () => {
  const cookieStore = await cookies()
  const refresh = cookieStore.get('refresh_token')?.value
  try {
    const response = await fetch(`${apiUrl}/api/accounts/token/refresh/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "refresh": refresh })
    });
    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }
    const data = await response.json();
    cookieStore.set({ name: 'access_token', value: data.access, httpOnly: true, secure: true, sameSite: 'strict',maxAge: 60 * 60 * 24 * 100  });
  } catch (error) {
    console.error('Token refresh error:', error);
    return null;
  }
};