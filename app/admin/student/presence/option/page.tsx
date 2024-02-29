"use server"

import {LateSettingForm} from "@/components/ui/admin/LateSetting";
import prisma from '@/components/db/prisma'

export default async function LatePresenceSettings() {
    const currentTime = await prisma.latePresenceMasterOption.findUnique({
        where: {
            id: 1
        }
    })

    const timeHours = currentTime?.lateTime.getHours()
    const timeMinute = currentTime?.lateTime.getMinutes()
    const parsedTime = `${timeHours?.toString().padStart(2, '0')}:${timeMinute?.toString().padStart(2, '0')}`

    return (
        <div className={'pt-10 pb-10 pr-3 pl-3 lg:pr-10 lg:pl-10 flex flex-col items-center w-full '}>
            {/*hello {userData?.user?.name}*/}
            <div className={'max-w-lg w-full flex flex-col gap-5'}>
                <div className={'flex flex-col'}>
                    <h1 className={'font-bold text-3xl'}>Pengaturan Jam Terlambat</h1>
                    {/*<p className={'font-bold text-xl'}>{mainSchedule?.classroom.name}</p>*/}
                </div>

                <div className={'flex flex-col gap-3'}>
                    <LateSettingForm time={parsedTime} />
                </div>
            </div>

        </div>

    )
}