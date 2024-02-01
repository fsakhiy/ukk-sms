"use client"
import { signOut } from "next-auth/react"
import {Button} from "@/components/ui/Button";

export default () => <Button onClick={() => signOut()} variant={'destructive'} >Log Out</Button>