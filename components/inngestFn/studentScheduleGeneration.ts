import {inngest} from "@/components/inngest/client";
import prisma from "@/components/db/prisma"
import {generateDatesInRange} from "@/components/sharedFunction/functions";

export const generateStudentSchedule = inngest.createFunction({id: 'student-schedule-generation'}, {event: "admin/student.schedule.generate"}, async({event}) => {
    console.log(event)

    const mainSchedules = await prisma.mainSchedule.findFirst({
        where: {
            classroomId: event.data.classroomId
        }
    })

    const classesDetail = await prisma.classesDetail.findMany({
        where: {
            // @ts-ignore
            mainScheduleId: mainSchedules.id
        }
    })
    const classeDetailIds = classesDetail.map(item => item.id)

    const classes = await prisma.classes.findMany({
        where :{
            classesDetailId: {
                in: classeDetailIds
            }
        }
    })

    const dailyDates = generateDatesInRange(event.data.period.startFrom, event.data.period.endIn)
    dailyDates.map(async (date) => {
        const dailyPresence = await prisma.studentPresence.create({
            data: {
                effectiveDate: date,
                studentId: event.data.studentId
            }
        })
    })

    // return { mainSchedule: mainSchedules, classedDetail: classesDetail, classes: classes }
    // return { ids: classeDetailIds, classes: classes }

    return
})
