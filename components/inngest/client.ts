import { EventSchemas, Inngest } from "inngest";

type TestEvent = {
    data: {
        data: string;
        title: string;
    }
}

type Events = {
    "test/test.event": TestEvent
}

export const inngest = new Inngest({ id: "my-app", schemas: new EventSchemas().fromRecord<Events>() });


