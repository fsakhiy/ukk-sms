"use client"
import { signOut } from "next-auth/react"
import {Button} from "@/components/ui/button";

interface ButtonText {
    text: string
}
const LogoutButton = ({text}: ButtonText) => <Button onClick={() => signOut()} variant={'destructive'} >{text}</Button>
export default LogoutButton
