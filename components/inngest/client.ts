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

type Events = {
    "test/test.event": TestEvent
    "admin/class.detail.create": ScheduleGeneration
}

export const inngest = new Inngest({ id: "school-manager", schemas: new EventSchemas().fromRecord<Events>() });


