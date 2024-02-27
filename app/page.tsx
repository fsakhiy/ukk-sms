"use server"

import LoginButton from "@/components/web-component/LoginButton";
import LogoutButton from "@/components/web-component/LogoutButton";
import {getServerSession} from "next-auth";
import prisma from '@/components/db/prisma'
import {redirect} from "next/navigation";
import Link from "next/link";

export default async function HomePage() {
    const user = await getServerSession()

    if(user) {
        const userFromDB = await prisma.user.findUnique({
            where: {
                // @ts-ignore
                username: user.user.name
            }
        })

        if(userFromDB?.isAdmin) {
            redirect('/admin')
        } else if(userFromDB?.accountType === "STUDENT") {
            redirect('/student')
        } else if(userFromDB?.accountType === "TEACHER") {
            redirect('/teacher')
        } else {

              return (
                  <div className={'p-5 lg:p-10 flex flex-col gap-10'}>
                      <h1 className={'font-bold text-3xl'}>Selamat datang di School Manager</h1>
                      <div className={'flex flex-col sm:flex-row sm:items-center gap-5'}>
                          <p>
                              silahkan login untuk mengakses aplikasi ini
                          </p>
                          <LoginButton/>
                      </div>
                  </div>
              )
        }
    } else {
        return (
            <div className={'p-5 lg:p-10 flex flex-col gap-10'}>
                <h1 className={'font-bold text-3xl'}>Selamat datang di School Manager</h1>
                <div className={'flex flex-col sm:flex-row sm:items-center gap-5'}>
                    <p>
                        silahkan login untuk mengakses aplikasi ini
                    </p>
                    <LoginButton/>
                </div>
            </div>
        )
    }

}