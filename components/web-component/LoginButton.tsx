"use client"
import { signIn } from "next-auth/react"
import {Button} from "@/components/ui/button";

export default () => <Button onClick={() => signIn()}>Sign in</Button>