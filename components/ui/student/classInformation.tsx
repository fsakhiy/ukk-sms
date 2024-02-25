"use client"

import {Button} from "@/components/ui/button";
import {logToClass} from "@/app/student/class/action";
import {toast} from "@/components/ui/use-toast";
import {Toaster} from "@/components/ui/toaster";
import {parsePresenceStatus} from "@/components/sharedFunction/functions";
import LogPresence from "@/app/student/class/presenceDialog";

interface classInfoType {
    id: number,
    classId: number,
    name: string,
    startFrom: Date,
    endIn: Date,
    teacher: string
    presenceStatus: "NOT_YET" | "LATE" | "ON_TIME"
}

export default function ClassInformation({id, classId, name, startFrom, endIn, teacher, presenceStatus }: classInfoType) {

    const handlePresence = async () => {
        await logToClass(id, classId)
        toast({description: 'masuk kelas sukses'})
    }


    return (
        <div className={'p-2 border rounded-lg'}>
            <Toaster />
            <div className={'flex flex-col gap-3'}>
                <div className={'w-full'}>
                    <p className={'font-bold text-2xl'}>
                        {name} - {teacher}
                    </p>
                    <p>
                       {startFrom.toTimeString().split(' ')[0]} - {endIn.toTimeString().split(' ')[0]}
                    </p>
                    <p className={'underline font-semibold'}>
                        {parsePresenceStatus(presenceStatus)}
                    </p>
                </div>

                {presenceStatus != "NOT_YET" ?
                <div className={'text-center w-full md:ml-auto md:text-left font-bold'}>kamu sudah absen</div>
                    :
                // <Button
                //     onClick={handlePresence}
                //     className={'md:ml-auto'}>
                //     Masuk kelas
                // </Button>
                    <LogPresence studentId={id} classId={classId} subject={name} />
                }
            </div>
        </div>
    )
}