import {Button} from "@/components/ui/button";
import Link from "next/link";

interface classInfo {
    id: number,
    subject: string,
    classroom: string,
    startTime: Date,
    endTime: Date,
    classCode: string,
}

export default function ClassInformation({id, subject, classroom, startTime, endTime, classCode}: classInfo) {
    return (
        <div className={'flex flex-col rounded-lg border p-2 gap-3'}>
            <div className={'flex flex-row items-center'}>
                <div className={''}>
                    <p className={'font-bold text-xl'}>{classroom}</p>
                    <p className={'underline'}>{subject}</p>
                    <p>{startTime.toTimeString().split(' ')[0]} - {endTime.toTimeString().split(' ')[0]}</p>
                </div>
                <div className={'flex flex-col ml-auto'}>
                    <p>kode:</p>
                    <p className={'font-bold text-2xl'}>{classCode}</p>
                </div>
            </div>
            <div className={'w-full'}>
                <Button className={'w-full'}><Link href={`/teacher/presence/${id}`}>Lihat Detail Presensi</Link></Button>
            </div>
        </div>
    )
}