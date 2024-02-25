"use server"
import {getServerSession} from "next-auth";
import LogoutButton from "@/components/web-component/LogoutButton";
import prisma from '@/components/db/prisma'
import AdminNavbar from "@/components/ui/admin/AdminNavbar";

export default async function AdminPageLayout({
                                            children, // will be a page or nested layout
                                        }: {
    children: React.ReactNode
}) {
    const userSession = await getServerSession()

    const userData = await prisma.user.findUnique({
        where: {
            // @ts-ignore
            username: userSession.user.name
        }
    })

    if(!userData || userData.isAdmin === false) {
        return (
            <div className={'p-10 font-bold text-3xl'}>
                mohon maaf, kamu tidak bisa mengakses halaman ini
                <br/>
                <LogoutButton text={'ganti akun'} />
            </div>
        )
    } else {


    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}

            {/*<nav className={'p-2 flex items-center w-full space-x-5'}>*/}
            <nav className={'flex w-full'}>
                {/*<div>*/}

                {/*Welcome, <span>{userSession.user.name}</span>!*/}

                {/*</div>*/}
                {/*<div className={'flex justify-end'}>*/}
                {/*    <LogoutButton text={'log out'} />*/}
                {/*</div>*/}

                {/*<AdminNavbar name={userSession?.user?.name as string} />*/}
                <AdminNavbar />
            </nav>

            {children}
        </section>
    )
    }
}
