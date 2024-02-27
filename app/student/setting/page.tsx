"use server"

import {getServerSession} from "next-auth";
import prisma from "@/components/db/prisma"
import {StudentSettingForm} from "@/components/ui/student/studentAccountSettings";

export default async function StudentSettings() {
    const userData = await getServerSession()
    const userDataFromDB = await prisma.user.findUnique({
        where: {
            username: userData?.user?.name ?? ''
        }
    })

    return (
        <div className={'pt-10 pb-10 pr-3 pl-3 lg:pr-10 lg:pl-10 flex flex-col items-center w-full '}>
            {/*hello {userData?.user?.name}*/}
            <div className={'max-w-lg w-full flex flex-col gap-5'}>
                <div className={'flex flex-col'}>
                    <h1 className={'font-bold text-3xl'}>Pengaturan Akun</h1>
                    {/*<p className={'font-bold text-xl'}>{mainSchedule?.classroom.name}</p>*/}
                </div>

                <div className={'flex flex-col gap-3'}>
                    <StudentSettingForm id={userDataFromDB?.id ?? 0} username={userDataFromDB?.username ?? ''} />
                </div>
            </div>

        </div>

    )
}