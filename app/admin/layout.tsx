"use server"
import {getServerSession} from "next-auth";
import LogoutButton from "@/components/web-component/LogoutButton";

export default async function AdminPageLayout({
                                            children, // will be a page or nested layout
                                        }: {
    children: React.ReactNode
}) {
    const userSession = await getServerSession()

    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}

            <nav className={'p-2 flex items-center w-full space-x-5'}>
                <div>

                Welcome, <span>{userSession.user.name}</span>!

                </div>
                <div className={'flex justify-end'}>
                    <LogoutButton />
                </div>
            </nav>

            {children}
        </section>
    )
}