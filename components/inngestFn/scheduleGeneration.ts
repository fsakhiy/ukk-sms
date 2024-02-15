import {inngest} from "@/components/inngest/client";
import {generateDatesInRange, generateRandomString} from "@/components/sharedFunction/functions";

import prisma from '@/components/db/prisma'

export const generateScheduleDetail = inngest.createFunction(
    {id: 'schedule-generation'},
    {event: 'admin/class.detail.create'},
    async ({event}) => {

        const dates = generateDatesInRange(event.data.period.startFrom, event.data.period.endIn)
        const day = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']


        dates.forEach((date) => {
            event.data.classDetail.forEach(async (detail) => {
                if(day[date.getDay()] === detail.scheduleOrder) {
                    await prisma.classes.create({
                        data: {
                            effectiveDate: date,
                            classesDetailId: detail.id,
                            classCode: generateRandomString(4)
                        }
                    })
                }
            })
        })

        return event.data.classDetail
    }
);