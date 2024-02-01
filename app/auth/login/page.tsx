"use client"
import {signIn} from "next-auth/react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/Button";


export default function LoginPage () {
    return (
        <div>
            <form action={async (formData) => {
                await signIn("credentials", {
                    username: formData.get('username') as string,
                    password: formData.get('password') as string
                })
            }}>
                <Input type={'text'} id={'username'} placeholder={'username'}/>
                <Input type={'password'} id={'password'} placeholder={'password'}/>
                <Button type={"submit"}>login</Button>
            </form>
        </div>
    )
}