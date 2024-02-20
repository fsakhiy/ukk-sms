"use client"

import {Button} from "@/components/ui/button";
import {parsePresenceStatus} from "@/components/sharedFunction/functions";

export interface StudenDailyPresenceData {
    studentId: number
    name: string | undefined;
    status: "NOT_YET" | "LATE" | "ON_TIME"
    presenceTime: Date | null
    handler: (studentId: number) => Promise<void>
}


export default function StudentDailyPresence({studentId, name, status, presenceTime, handler}: StudenDailyPresenceData) {
    return (
        <div className={''}>
            <h1>{name} - {parsePresenceStatus(status)}</h1>

            {(status === "NOT_YET") ?
                <div>
                    <Button
                        variant={'outline'}
                        onClick={async () => {
                            await handler(studentId)
                        }}
                    >Absen Dulu</Button>
                </div>
                : <div>kamu sudah absen - {presenceTime?.toString()}</div> }
        </div>
    )
}