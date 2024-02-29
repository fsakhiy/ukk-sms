"use client"
import { signIn } from "next-auth/react"
import {Button} from "@/components/ui/button";

const LoginButton  = () => <Button onClick={() => signIn()}>Sign in</Button>
export default LoginButton
