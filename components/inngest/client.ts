import { EventSchemas, Inngest } from "inngest";

type TestEvent = {
    data: {
        data: string;
        title: string;
    }
}

type ScheduleGeneration = {
    data: {
        period: {
            startFrom: Date
            endIn: Date
        }
        classDetail: {
            id: number,
            scheduleOrder: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY"
        }[]
    }
}

type StudentScheduleGeneration = {
    data: {
        studentId: number,
        classroomId: number,
        period: {
            startFrom: Date,
            endIn: Date
        }
    }
}

type Events = {
    "test/test.event": TestEvent
    "admin/class.detail.create": ScheduleGeneration
    "admin/student.schedule.generate": StudentScheduleGeneration
}

export const inngest = new Inngest({ id: "school-manager", schemas: new EventSchemas().fromRecord<Events>() });


