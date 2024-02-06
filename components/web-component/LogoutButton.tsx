"use client"
import { signOut } from "next-auth/react"
import {Button} from "@/components/ui/button";

export default () => <Button onClick={() => signOut()} variant={'destructive'} >Log Out</Button>