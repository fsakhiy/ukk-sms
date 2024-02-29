"use client"

import {Button} from "@/components/ui/button";
import {parsePresenceStatus} from "@/components/sharedFunction/functions";
import {redirect} from "next/navigation";
import Link from "next/link";

export interface StudenDailyPresenceData {
    studentId: number
    name: string | undefined;
    status: "NOT_YET" | "LATE" | "ON_TIME"
    presenceTime: Date | null
    handler: (studentId: number) => Promise<void>
}


export default function StudentDailyPresence({studentId, name, status, presenceTime, handler}: StudenDailyPresenceData) {
    const statusReal = parsePresenceStatus(status)

    return (
        <div className={'flex flex-col gap-10 w-full max-w-lg'}>
            {/*<h1>{name} - {parsePresenceStatus(status)}</h1>*/}


            {(status === "NOT_YET") ?
                <div className={'flex flex-col w-full gap-3'}>
                    <p className={'text-center'}>Kamu Belum Melakukan Presensi</p>
                    <Button
                        // variant={'outline'}
                        onClick={async () => {
                            await handler(studentId)
                        }}
                    >Presensi Dulu Yuk</Button>
                </div>
                : <div>Kamu Sudah Absen - {parsePresenceStatus(status) === 'Terlambat' ? <span>Terlambat</span> : <span>{parsePresenceStatus(status)}</span>} <br/> {presenceTime?.toString()} </div>
            }

            <Button className={'w-full'} variant={'outline'} ><Link href={'/student/history'}>riwayat presensi</Link></Button>
        </div>
    )
}