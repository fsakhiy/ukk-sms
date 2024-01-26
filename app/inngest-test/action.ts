"use server"

import {  Inngest} from "inngest";
import prisma from "@/components/db/prisma";
import { inngest } from "@/components/inngest/client";


interface Payload {
    title: string;
    data: string;
}

export async function SendEventTest({title, data}: Payload): Promise<boolean> {
    // const inngest = new Inngest({id: "sms-test-event"})

    await inngest.send({
        name: "test/test.event",
        data : {
            title: title,
            data: data
        }
    })

    return true;
    // return false;
}

// export { SendEventTest }