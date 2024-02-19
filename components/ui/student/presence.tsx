"use client"

import {Button} from "@/components/ui/button";

export interface StudenDailyPresenceData {
    studentId: number
    name: string | undefined;
    status: "NOT_YET" | "LATE" | "ON_TIME"
    presenceTime: Date | null
    handler: (studentId: number) => Promise<void>
}

const parsePresenceStatus = (status: StudenDailyPresenceData["status"]): string => {
    let parsedPresenceStatus: string
    
    switch(status) {
        
        case "LATE":
            parsedPresenceStatus = "Terlambat"
            break;
            
        case "NOT_YET":
            parsedPresenceStatus = "Belum Abasen"
            break;
            
        case "ON_TIME":
            parsedPresenceStatus = "Tepat Waktu"
            break;
            
        default:
            parsedPresenceStatus = "Tidak Ada Data"
            break;
    }
    
    return parsedPresenceStatus
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
                : <div>kamu sudah absen - {presenceTime?.toLocaleDateString()}</div> }
        </div>
    )
}