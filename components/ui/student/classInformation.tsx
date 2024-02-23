import {Button} from "@/components/ui/button";

interface classInfoType {
    id: number,
    name: string,
    // handler: (id: number) => Promise<void>
    startFrom: Date,
    endIn: Date,
    teacher: string
    presenceStatus: string
}

export default function ClassInformation({id, name, startFrom, endIn, teacher, presenceStatus }: classInfoType) {
    return (
        <div className={'p-2 border rounded-lg flex flex-col md:items-center md:flex-row gap-5'}>
            <div>
                <p className={'font-bold text-2xl'}>
                    {name} - {teacher}
                </p>
                <p>
                   {startFrom.toTimeString().split(' ')[0]} - {endIn.toTimeString().split(' ')[0]}
                </p>
                <p className={'underline font-semibold'}>
                    {presenceStatus}
                </p>
            </div>

            <Button className={'md:ml-auto'}>
                Masuk kelas
            </Button>
        </div>
    )
}