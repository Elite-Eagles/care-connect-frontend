"use client"
import useTokenRefresh from '@/hooks/refreshAuthTokens'

export default function TokenRefresh() {
    useTokenRefresh()
    return null
}
