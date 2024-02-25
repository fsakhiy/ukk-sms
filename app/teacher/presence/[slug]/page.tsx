"use server"

import prisma from "@/components/db/prisma"
import ClassInformation from "@/components/ui/teacher/ClassInformation";
import InformationCounter from "@/components/ui/teacher/Counter";
import {columns, StudentPresenceForTeacher} from "@/app/teacher/presence/[slug]/columns";
import {parsePresenceStatus} from "@/components/sharedFunction/functions";
import {DataTable} from "@/components/web-component/DataTable";
import {dummyPresenceHandler} from "@/app/teacher/presence/[slug]/action";

export default async function Page({ params }: { params: { slug: string } }) {
    const classes = await prisma.classes.findUnique({
        where: {
            id: +params.slug
        },
        include: {
            classesDetail: {
                include: {
                    mainSchedule: {
                        include: {
                            classroom: true
                        }
                    },
                    subject: true,
                    scheduleOrder: true
                }
            },
            StudentClassPresence: {
                include: {
                    student: true
                }
            }
        }
    })

    const studentPresence: StudentPresenceForTeacher[] = []
    classes?.StudentClassPresence.map((detail) => {
        studentPresence.push({
            id: detail.id,
            name: detail.student.name,
            status: parsePresenceStatus(detail.status),
            logTime: detail.logTime?.toTimeString().split(' ')[0] ?? 'belum masuk'
        })
    })

    return (
        <div className={'pt-10 pb-10 pr-3 pl-3 lg:pr-10 lg:pl-10 flex flex-col items-center w-full'}>
            <div className={"max-w-lg w-full flex flex-col gap-5"}>
                <div className={'flex flex-col'}>
                    <h1 className={'font-bold text-3xl'}>{classes?.classesDetail.subject.name} - {classes?.classesDetail.mainSchedule.classroom.name}</h1>
                    <p className={'underline'}>{classes?.effectiveDate.toDateString()}</p>
                </div>
                <div>
                    <p>Kode Kelas:</p>
                    <p className={'font-bold text-3xl'}>{classes?.classCode}</p>
                </div>
                <div className={'grid grid-cols-2 gap-2'}>
                    <InformationCounter name={'total murid'} count={classes?.StudentClassPresence.length ?? 0} />
                    <InformationCounter name={'yang sudah melakukan presensi'} count={classes?.StudentClassPresence.filter((detail) => detail.status != "NOT_YET").length ?? 0} />
                    <InformationCounter name={'murid yang terlambat'} count={classes?.StudentClassPresence.filter((detail) => detail.status != "NOT_YET").length ?? 0} />
                    <InformationCounter name={'murid yang tepat waktu'} count={classes?.StudentClassPresence.filter((detail) => detail.status != "NOT_YET").length ?? 0} />
                </div>

                <div className={'flex flex-col'}>
                    <p className={'font-bold text-xl'}>Data Presensi Murid</p>
                    <DataTable columns={columns} data={studentPresence} handler={dummyPresenceHandler} />
                </div>
            </div>

        </div>
    )
}