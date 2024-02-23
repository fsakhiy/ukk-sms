"use server"

import LoginButton from "@/components/web-component/LoginButton";
import LogoutButton from "@/components/web-component/LogoutButton";
import {getServerSession} from "next-auth";
import prisma from '@/components/db/prisma'
import {redirect} from "next/navigation";

export default async function HomePage() {
    const user = await getServerSession()

    if(user) {
        const userFromDB = await prisma.user.findUnique({
            where: {
                // @ts-ignore
                username: user.user.name
            }
        })

        if(userFromDB.isAdmin) {
            redirect('/admin')
        } else {

              return (
                  <div>
                    welcome to school manager, this website is currently in development..
                      {/*<Button >Sign in</Button>*/}
                      <LoginButton />
                      <LogoutButton text={'logout'} />
                  </div>
              )
            }
    } else {
        return (
            <div>
                welcome to school manager, this website is currently in development..
                {/*<Button >Sign in</Button>*/}
                <LoginButton />
                <LogoutButton text={'logout'} />
            </div>
        )
    }

}