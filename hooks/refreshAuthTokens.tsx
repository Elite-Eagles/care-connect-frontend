"use client"
import { fetchNewAccessToken } from '@/app/actions/refresh_auth_tokens';
import { useEffect } from 'react';

export default function useTokenRefresh() {
  useEffect(() => {

    const refresh = async () => {
      await fetchNewAccessToken();
    };
    refresh();
    const intervalId = setInterval(refresh, 4 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);
}