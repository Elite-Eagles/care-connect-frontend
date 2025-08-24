import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LogIn from './login'
import SignUp from './signup'

export default function Auth() {
    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <Tabs defaultValue="login" className="">
                <TabsContent value="login">
                    <LogIn />
                </TabsContent>
                <TabsContent value="signup">
                    <SignUp />
                </TabsContent>
            </Tabs>
        </div>
    )
}
