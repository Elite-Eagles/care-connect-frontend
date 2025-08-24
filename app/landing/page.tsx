"use client"

import { Spinner } from '@/components/spinner';
import { UserState } from '@/components/userContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function page() {
    const user = UserState()
    const router = useRouter()
    useEffect(() => {
        if (!user?.loading && user?.isauth) {
            if (user.role === "normal") {
                router.replace("/dashboard");
            }
            if (user.role === "admin") {
                router.replace("/admin");
            }
            if (user.role === "staff") {
                router.replace("/volunteer");
            }
        }
    }, [user, router]);
    if (user?.loading) {
        return <Spinner />
    }
    return (
        <div>redirecting...</div>
    )
}
