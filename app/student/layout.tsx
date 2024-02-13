"use server"
import {getServerSession} from "next-auth";
import LogoutButton from "@/components/web-component/LogoutButton";
import prisma from "@/components/db/prisma";

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
        },
        select: {
            student: true,
            accountType: true
        }
    })


    // @ts-ignore
    if(userData.accountType != "STUDENT") {
        return (
            <div className={'p-10 font-bold text-3xl'}>
                mohon maaf, kamu tidak bisa mengakses halaman ini
                <br/>
                <LogoutButton text={'ganti akun'}/>
            </div>
        )
    } else {
        return (
            <section>
                {/* Include shared UI here e.g. a header or sidebar */}

                <nav className={'p-2 flex items-center w-full space-x-5'}>
                <div>

                        Selamat datang, <span>{userSession.user.name}</span>!

                    </div>
                    <div className={'flex justify-end'}>
                        <LogoutButton text={'logout'} />
                    </div>
                </nav>

                {children}
            </section>
        )
    }
}