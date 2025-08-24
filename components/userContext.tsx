"use client"


import { user_authenticated } from "@/app/actions/is_authenticated";
import { useContext,createContext,useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react"

interface UserContextType {
  isauth: boolean;
  role: string;
  setIsauth: Dispatch<SetStateAction<boolean>>;
  loading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({children}: {children: ReactNode}) {
    const [isauth, setIsauth] = useState<boolean>(false)
    const [role, setRole] = useState<string>('')
    const [loading, setLoading] = useState(true);
    useEffect(() => {
       (async () => {
        const data = await user_authenticated()
        setIsauth(data.is_authenticated)
        setRole(data.role)
        setLoading(false)
       })()
    },[])
    return(
        <UserContext.Provider value={{isauth, setIsauth, role, loading}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserState = () => useContext(UserContext)